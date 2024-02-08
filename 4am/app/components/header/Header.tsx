import "./header.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Header() {
    return (
      <header className="main-header">
      <nav className="navigation-links">
        <a href="#about">About</a>
        <a href="#presale">Presale</a>
        <a href="https://axxis.gitbook.io/axxis-project/token-economics">Whitepaper</a>
        <a href="#faq">F.A.Q.</a>
      </nav>
      <div  className="action-button"> <ConnectButton
                                label="Connect Wallet"
                                chainStatus="icon"
                                accountStatus={{
                                    smallScreen: "full",
                                    largeScreen: "full",
                                }}
                                showBalance={{
                                    smallScreen: false,
                                    largeScreen: true,
                                }}
                            /></div>
    </header>
    );
  }


  
  
