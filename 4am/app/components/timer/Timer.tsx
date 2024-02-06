"use client"

import "./timer.css";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { WalletButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import { formatUnits, parseAbi, parseEther, parseUnits } from "viem";
import { useAccount, useChainId, useContractWrite, usePrepareContractWrite } from "wagmi";
import { multicall } from "wagmi/actions";

const saleContractAddress = "0x0";

interface CurrencyInfo {
    address: `0x${string}`,
    decimals: number,
    amount: bigint,
}

const formatAmount = (i: CurrencyInfo): string => {
    if (i.amount === BigInt("0")) { return ""; }
    let fullAmount = formatUnits(i.amount, i.decimals);
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
]);

export default function Timer() {
    const [amountToSpend, setAmountToSpend] = useState("1000.0")

    const [currency, setCurrency] = useState<"USDT" | "USDC">("USDC");
    const [currencyInfos, setCurrencyInfos] = useState<CurrencyInfo[]>([
        { "address": "0x0", "decimals": 6, "amount": BigInt("0") },
        { "address": "0x1", "decimals": 6, "amount": BigInt("0") },
    ]);

    const [isAmountOK, setIsAmountOK] = useState(true);
    const [parsedAmount, setParsedAmount] = useState(BigInt("1000000000"));

    const account = useAccount();
    const chainId = useChainId();

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
            ],
        }).then(((accountAddressAtRequest, chainIdAtRequest) => {
            if (account.address !== accountAddressAtRequest || chainId !== chainIdAtRequest)
                return;
            return (result) => {
                if (result[0].status === "success" && result[1].status === "success") {
                    const newCurrencyInfos = [
                        Object.assign({}, currencyInfos[0]),
                        Object.assign({}, currencyInfos[1]),
                    ];
                    newCurrencyInfos[0].amount = result[0].result;
                    newCurrencyInfos[1].amount = result[1].result;
                    setCurrencyInfos(newCurrencyInfos);
                }
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

    const preparedBuy = usePrepareContractWrite({
        address: saleContractAddress,
        abi: SALES_ABI,
        functionName: "buy",
        chainId,
        args: [
            currencyInfos[currency === "USDT" ? 0 : 1].address,
            parsedAmount,
        ],
        enabled: isAmountOK && !!account
    })

    const action = useContractWrite(preparedBuy.config)

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
                    <div className="timer__clock">
                        <h2 className="timer__clock_title">Until presale end</h2>
                        <div className="timer__clock_nums">
                            <div className="timer__clock_num">
                                <h2 className="timer__clock_num-up">00</h2>
                                <h2 className="timer__clock_num-down">Days</h2>
                            </div>
                            <p className="timer__clock_nums_dots">:</p>
                            <div className="timer__clock_num">
                                <h2 className="timer__clock_num-up">00</h2>
                                <h2 className="timer__clock_num-down">Hours</h2>
                            </div>
                            <p className="timer__clock_nums_dots">:</p>
                            <div className="timer__clock_num">
                                <h2 className="timer__clock_num-up">00</h2>
                                <h2 className="timer__clock_num-down">Minutes</h2>
                            </div>
                            <p className="timer__clock_nums_dots">:</p>
                            <div className="timer__clock_num">
                                <h2 className="timer__clock_num-up">00</h2>
                                <h2 className="timer__clock_num-down">Seconds</h2>
                            </div>
                        </div>
                        <div className="timer__clock_timelineblock">
                            <div className="timer__clock_timeline">
                                <div className="timer__clock_timeline-dot"></div>
                            </div>
                            <div className="timer__clock_percents">
                                <p className="timer__clock_percent0">0%</p>
                                <p className="timer__clock_percent100">100%</p>
                            </div>
                        </div>
                    </div>
                    <div className="timer__web3">
                        <div>
                            <ConnectButton
                                label="Get yours"
                                chainStatus="icon"
                                accountStatus={{
                                    smallScreen: "avatar",
                                    largeScreen: "full",
                                }}
                                showBalance={{
                                    smallScreen: false,
                                    largeScreen: true,
                                }}
                            />
                        </div>
                        <div>
                            <input type="text" value={amountToSpend}
                                onChange={e => setAmountToSpend(e.target.value)}></input>
                            <button className={`some-class${currency === "USDT" ? " selected-currency" : " "}`}
                                onClick={() => setCurrency("USDT")}>USDT{formatAmount(currencyInfos[0])}</button>
                            <button className={`some-class${currency === "USDC" ? " selected-currency" : " "}`}
                                onClick={() => setCurrency("USDC")}>USDC{formatAmount(currencyInfos[1])}</button>
                        </div>
                        <div>
                            <button onClick={() => { action.write && action.write() }}>Buy!</button>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
}

