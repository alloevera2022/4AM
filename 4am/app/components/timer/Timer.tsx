"use client"

import "./timer.css";
import Wait from "./Wait";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { WalletButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import { formatUnits, parseAbi, parseEther, parseUnits } from "viem";
import { useAccount, useChainId, useContractWrite, usePrepareContractWrite, useSendTransaction, useWaitForTransaction } from "wagmi";
import { multicall } from "wagmi/actions";

const saleContractAddress = "0x277bFD5b92cda825783319fCDBA6e637Dc181021";

interface CurrencyInfo {
    address: `0x${string}`,
    decimals: number,
    balance: bigint,
    approvedAmount: bigint,
}

const formatAmount = (i: CurrencyInfo): string => {
    if (i.balance === BigInt("0")) { return ""; }
    let fullAmount = formatUnits(i.balance, i.decimals);
    const dotIndex = fullAmount.indexOf(".");
    if (dotIndex >= 0) {
        fullAmount = fullAmount.substring(0, dotIndex + 3);
    }
    while (fullAmount.length < dotIndex + 3) {
        fullAmount = fullAmount.concat("0");
    }
    return " " + fullAmount;
}

const SALES_ABI = parseAbi([
    "function buy(address currency, uint256 amount)"
]);
const TOKEN_ABI = parseAbi([
    "function balanceOf(address owner) returns (uint256)",
    "function allowance(address owner, address spender) returns (uint256)",
    "function approve(address spender, uint256 amount)",
]);

export default function Timer() {
    const [amountToSpend, setAmountToSpend] = useState("1000.0")
    const [currency, setCurrency] = useState<"USDT" | "USDC">("USDC");
    const [currencyInfos, setCurrencyInfos] = useState<CurrencyInfo[]>([
        { "address": "0x6f4948c484f6dEfC986c136562D98dfB3280EC18", "decimals": 18, "balance": BigInt("0"), "approvedAmount": BigInt("0") },
        { "address": "0x1E44331ca731aFb1DA8A4B75a9f5E32199b15942", "decimals": 18, "balance": BigInt("0"), "approvedAmount": BigInt("0") },
    ]);
    const [isAmountOK, setIsAmountOK] = useState(true);
    const [parsedAmount, setParsedAmount] = useState(BigInt("1000000000"));

    const account = useAccount();
    const chainId = useChainId();

    const [transitionState, setTransitionState] = useState<"not-started" | "approving" | "approved" | "buying" | "bought">("not-started");
    const [approvalTxHash, setApprovalTxHash] = useState<undefined | `0x${string}`>();
    const [purchaseTxHash, setPurchaseTxHash] = useState<undefined | `0x${string}`>();

    useEffect(() => {
        if (!account.address) return;
        multicall({
            chainId,
            contracts: [
                {
                    abi: TOKEN_ABI,
                    address: currencyInfos[0].address,
                    functionName: "balanceOf",
                    args: [account.address]
                },
                {
                    abi: TOKEN_ABI,
                    address: currencyInfos[1].address,
                    functionName: "balanceOf",
                    args: [account.address]
                },
                {
                    abi: TOKEN_ABI,
                    address: currencyInfos[0].address,
                    functionName: "allowance",
                    args: [account.address, saleContractAddress],
                },
                {
                    abi: TOKEN_ABI,
                    address: currencyInfos[1].address,
                    functionName: "allowance",
                    args: [account.address, saleContractAddress],
                },
            ],
        }).then(((accountAddressAtRequest, chainIdAtRequest) => {
            if (account.address !== accountAddressAtRequest || chainId !== chainIdAtRequest)
                return;
            return (result) => {
                const newCurrencyInfos = [
                    Object.assign({}, currencyInfos[0]),
                    Object.assign({}, currencyInfos[1]),
                ];
                if (result[0].status === "success") {
                    newCurrencyInfos[0].balance = result[0].result;
                }
                if (result[1].status === "success") {
                    newCurrencyInfos[1].balance = result[1].result;
                }
                if (result[2].status === "success") {
                    newCurrencyInfos[0].approvedAmount = result[2].result;
                }
                if (result[3].status === "success") {
                    newCurrencyInfos[1].approvedAmount = result[3].result;
                }
                setCurrencyInfos(newCurrencyInfos);
            }
        })(account.address, chainId))
    }, [account.address, chainId]);

    useEffect(() => {
        try {
            const r = parseUnits(amountToSpend, currencyInfos[currency === "USDT" ? 0 : 1].decimals);
            setIsAmountOK(true);
            setParsedAmount(r);
        } catch (e) {
            setIsAmountOK(false);
        }
    }, [amountToSpend, currency]);

    useEffect(() => {
        if (!isAmountOK) return;
        const approvedAmount = currencyInfos[currency === "USDT" ? 0 : 1].approvedAmount;
        if (approvedAmount >= parsedAmount && transitionState === "not-started") {
            setTransitionState("approved");
        }
        if (approvedAmount < parsedAmount && transitionState === "approved") {
            setTransitionState("not-started");
        }
    }, [currency, isAmountOK, parsedAmount, currencyInfos]);

    const prepareApprove = usePrepareContractWrite({
        address: currencyInfos[currency === "USDT" ? 0 : 1].address,
        abi: TOKEN_ABI,
        functionName: "approve",
        chainId,
        args: [
            saleContractAddress,
            parsedAmount,
        ],
        enabled: isAmountOK && !!account && transitionState === "not-started"
    })
    const approveAction = useContractWrite(prepareApprove.config);
    const approvalIsReady = useWaitForTransaction({
        hash: approvalTxHash,
        enabled: !!approvalTxHash,
        timeout: 999999,
    })

    const preparedBuy = usePrepareContractWrite({
        address: saleContractAddress,
        abi: SALES_ABI,
        functionName: "buy",
        chainId,
        args: [
            currencyInfos[currency === "USDT" ? 0 : 1].address,
            parsedAmount,
        ],
        enabled: isAmountOK && !!account &&
            (transitionState === "approved" || (transitionState === "approving" && approvalIsReady.status === "success"))
    })
    const buyAction = useContractWrite(preparedBuy.config);
    const purchaseIsReady = useWaitForTransaction({
        hash: purchaseTxHash,
        enabled: !!purchaseTxHash,
        timeout: 999999,
    })

    // Обработчики событий для изменения стиля при нажатии на кнопки
    const handleUSDTButtonClick = () => {
        setCurrency("USDT");
        document.getElementById('usdtButton')?.classList.add('selected-currency');
        document.getElementById('usdcButton')?.classList.remove('selected-currency');
    };

    const handleUSDCButtonClick = () => {
        setCurrency("USDC");
        document.getElementById('usdcButton')?.classList.add('selected-currency');
        document.getElementById('usdtButton')?.classList.remove('selected-currency');
    };

    

    return (
        <section className="Timer" id='presale'>
            <div className="timer__conteiner">
                <div className="timer__info">
                    <h1 className="timer__info-title">Become a Part<br />of Revolution Now</h1>
                    <p className="timer__info-text">Introducing the AXXIS Token: your gateway to an exclusive digital fashion marketplace. Seize this presale opportunity to be among the first to access and trade in high-end fashion NFTs, revolutionizing how luxury is owned and experienced</p>
                </div>
                <div className="timer__content">
                    <div className="timer__price">
                        <p className="timer__price1">Current price</p>
                        <p className="timer__price2">0.01$</p>
                    </div>
                    <div className="timer__manual">
                        <h2 className="timer__manual_title">How to participate?</h2>
                        <ol className="timer__manual_list">
                            <li className="timer__manual_listpoint">Deposit some ETH for gas fees and enough USDC/USDT on your CEX/Metamask wallet</li>
                            <li className="timer__manual_listpoint">Press "Connect" button below</li>
                            <li className="timer__manual_listpoint">Specify the amount and currency</li>
                            <li className="timer__manual_listpoint">Receive $AXXIS by $0.01 ratio</li>
                        </ol>
                    </div>

                    <Wait/>
                    
                    <div className="timer__web3">
                        <div className="timer__web3_connect">
                            <ConnectButton
                                label="CONNECT"
                                chainStatus="icon"
                                accountStatus={{
                                    smallScreen: "full",
                                    largeScreen: "full",
                                }}
                                showBalance={{
                                    smallScreen: false,
                                    largeScreen: true,
                                }}
                            />
                        </div>
                        <div className="timer__web3_buy">
                            <input type="text" placeholder='1000' value={amountToSpend}
                                onChange={e => setAmountToSpend(e.target.value)}></input>
                            <button id="usdtButton" className={`currency-button${currency === "USDT" ? " selected-currency" : ""}`}
                                onClick={handleUSDTButtonClick}>USDT{formatAmount(currencyInfos[0])}</button>
                            <button id="usdcButton" className={`currency-button${currency === "USDC" ? " selected-currency" : ""}`}
                                onClick={handleUSDCButtonClick}>USDC{formatAmount(currencyInfos[1])}</button>
                        </div>
                        <div className="timer__web3_buybtn">
                            {transitionState === "not-started" &&
                                <button onClick={async () => {
                                    console.log(approveAction);
                                    if (approveAction.writeAsync) {
                                        setTransitionState("approving");
                                        try {
                                            const txHash = await approveAction.writeAsync();
                                            setApprovalTxHash(txHash.hash);
                                        } catch (e) {
                                            console.error(e)
                                            setTransitionState("not-started");
                                        }
                                    }
                                }
                                } disabled={approveAction.isError}>Approve</button>
                            }
                            {transitionState === "approving" && approvalIsReady.status === "loading" && <button>Approving...</button>}
                            {(transitionState === "approved" ||
                                (transitionState === "approving" && approvalIsReady.status === "success")) &&
                                <button onClick={async () => {
                                    console.log(buyAction)
                                    if (buyAction.writeAsync) {
                                        setTransitionState("buying");
                                        try {
                                            const txHash = await buyAction.writeAsync();
                                            setPurchaseTxHash(txHash.hash);
                                            const newCurrencyInfos = [
                                                Object.assign({}, currencyInfos[0]),
                                                Object.assign({}, currencyInfos[1]),
                                            ];
                                            const idx = currency === "USDT" ? 0 : 1;
                                            newCurrencyInfos[idx].balance -= parsedAmount;
                                            newCurrencyInfos[idx].approvedAmount -= parsedAmount;
                                            setCurrencyInfos(newCurrencyInfos);
                                        } catch (e) {
                                            console.error(e)
                                            setTransitionState("approved");
                                        }
                                    }
                                }
                                } disabled={buyAction.isError}>Buy!</button>
                            }
                            {transitionState === "buying" && purchaseIsReady.status === "loading" && <button>Buying...</button>}
                            {(transitionState === "buying" && purchaseIsReady.status === "success") && <span className="purchase-completed">Purchase completed!</span>}
                        </div>
                    </div>
                    <div className="counterdynamic-svg"><svg width="557" height="557" viewBox="0 0 557 557" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M415.936 322.422V322.422C421.497 332.053 451.661 337.894 451.877 326.775C452.377 300.966 446.071 274.695 432.223 250.71C394.363 185.133 313.524 159.84 245.828 189.869C238.706 193.029 236.363 201.73 240.262 208.476L278.292 274.285C282.114 280.9 290.512 283.117 297.647 280.385C341.289 263.674 391.826 280.662 415.936 322.422ZM294.31 302.005C290.393 295.226 292.776 286.44 300.121 283.729C341.717 268.376 389.552 284.722 412.472 324.422C437.952 368.553 423.045 424.92 379.219 450.724C378.938 450.889 378.656 451.053 378.373 451.216C334.03 476.712 277.397 461.496 251.811 417.179C228.837 377.388 238.697 327.65 272.984 299.337C279.005 294.364 287.778 296.696 291.685 303.458L374.924 447.5C375.339 448.217 376.256 448.463 376.973 448.048V448.048C377.691 447.634 377.936 446.716 377.522 445.999L294.31 302.005ZM275.668 275.741C279.5 282.372 277.207 290.777 271.249 295.588C234.825 325.003 224.201 377.358 248.347 419.179V419.179C253.908 428.811 243.884 457.855 234.147 452.482C211.545 440.01 191.947 421.414 178.099 397.428C140.204 331.793 158.787 249.048 218.769 205.468C225.064 200.894 233.756 203.214 237.649 209.951L275.668 275.741ZM221.636 182.24C225.48 188.893 223.192 197.353 216.956 201.842C154.909 246.505 135.593 331.806 174.635 399.428C204.631 451.383 260.889 478.723 316.96 474.36C235.437 490.433 149.202 454.175 105.339 378.202C52.7291 287.079 80.0753 171.734 165.61 113.408C172.02 109.036 180.669 111.349 184.551 118.067L221.636 182.24ZM224.248 180.765C228.087 187.409 236.543 189.654 243.542 186.509C313.219 155.197 396.67 181.129 435.687 248.71C465.314 300.024 461.336 361.519 430.581 407.711C483.714 345.183 494.693 253.584 451.315 178.452C398.857 87.5914 285.793 53.5356 192.666 97.8658C185.637 101.212 183.291 109.89 187.186 116.631L224.248 180.765ZM382.47 453.451C381.876 453.805 381.28 454.156 380.68 454.503L380.52 454.595L380.371 454.682L380.202 454.779C282.75 511.043 158.139 477.654 101.875 380.202C45.6109 282.75 79.0004 158.139 176.452 101.875C273.904 45.6109 398.515 79.0004 454.779 176.452C510.604 273.144 478.169 396.574 382.47 453.451Z" fill="white" fill-opacity="0.05"></path>
</svg></div>
                </div>
            </div>
        </section >
    );
}

