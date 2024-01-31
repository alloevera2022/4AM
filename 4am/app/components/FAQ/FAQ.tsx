import "./faq.css";
import backgroundImg from '../public/img/footer_logo.svg';
import footerLogo from '../public/img/logo_main.webp';




export default function FAQ() {
    return (
      <section id='faq'>
        <div className="FAQ">
        <div className="faq__container">
            <h1 className="faq__header">F.A.Q.</h1>
            <div className="faq__content">
                <div className="faq__content-element">
                    <div className="faq__content-element_headerblog">
                        <h2 className="faq__content-element_header">What is AXXIS?</h2>
                        <div className="faq__content-element_headercross"></div>
                    </div>
                    <p className="faq__content-element_text">AXXIS is a digital marketplace for exclusive fashion items represented as Non-Fungible Tokens (NFTs). It combines luxury fashion with blockchain technology, offering a unique platform for buying, selling, and trading high-end fashion NFTs.</p>
                </div>
                <div className="faq__content-element">
                    <div className="faq__content-element_headerblog">
                        <h2 className="faq__content-element_header">How do I purchase on AXXIS?</h2>
                        <div className="faq__content-element_headercross"></div>
                    </div>
                    <p className="faq__content-element_text">To purchase NFTs on AXXIS, create an account, acquire AXXIS tokens during our presale or through the platform, and use them to buy NFTs from the NFT or Secondary/Celebrity Floors.</p>
                </div>
                <div className="faq__content-element">
                    <div className="faq__content-element_headerblog">
                        <h2 className="faq__content-element_header">What makes AXXIS different from other NFT platforms?</h2>
                        <div className="faq__content-element_headercross"></div>
                    </div>
                    <p className="faq__content-element_text">AXXIS specializes in fashion NFTs, providing exclusive access to high-end fashion items in digital form. Its unique access key system for brand-specific NFTs and specialized floors for trading and auctions set it apart.</p>
                </div>
                <div className="faq__content-element">
                    <div className="faq__content-element_headerblog">
                        <h2 className="faq__content-element_header">Are my transactions secure on the platform?</h2>
                        <div className="faq__content-element_headercross"></div>
                    </div>
                    <p className="faq__content-element_text">Yes, security is paramount at AXXIS. We employ advanced blockchain technology to ensure secure and transparent transactions.</p>
                </div>
                <div className="faq__content-element">
                    <div className="faq__content-element_headerblog">
                        <h2 className="faq__content-element_header">Can I sell my NFTs on AXXIS?</h2>
                        <div className="faq__content-element_headercross"></div>
                    </div>
                    <p className="faq__content-element_text">Absolutely. AXXIS provides a platform for users to resell their fashion NFTs on the Secondary and Celebrity Floors, subject to membership level and platform rules.</p>
                </div>
                <div className="faq__content-element">
                    <div className="faq__content-element_headerblog">
                        <h2 className="faq__content-element_header">How do I get started?</h2>
                        <div className="faq__content-element_headercross"></div>
                    </div>
                    <p className="faq__content-element_text">Join the AXXIS community by signing up on our website, participating in the token presale, and exploring our unique range of fashion NFTs.</p>
                </div>
                
            </div>
            <img className="faq_bg" src={backgroundImg.src} alt="footer_bg"></img>
            <div className="faq__button"><button><a href="https://twitter.com/XXS_crypto">Get it touch</a></button></div>
            <div className="faq__footer">
                <div className="faq__footer-left">
                <img className="faq__footer-left-logo"src={footerLogo.src} alt="footerLogo" />
                    <div className="faq__footer-left-text">
                        <p className="faq__footer-left-textup">AXXIS</p>
                        <p className="faq__footer-left-textdown">/ Future fashion now</p>
                    </div>
                </div>
                <div className="faq__footer-right">
                    <div className="faq__footer-right-text">
                        <p className="faq__footer-right-textup">Contact us</p>
                        <p className="faq__footer-right-textdown"><a href="mailto:business@axxis.vip">business@axxis.vip</a></p>
                    </div>               
                </div>
            </div>
        </div>
        </div>
    </section >
    );
  }