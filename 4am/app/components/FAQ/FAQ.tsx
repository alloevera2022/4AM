"use client"

import "./faq.css";
import backgroundImg from '../public/img/footer_logo.svg';
import footerLogo from '../public/img/logo_main.webp';
import Inner from "./Inner";





export default function FAQ() {
    return (
      <section id='faq'>
        <div className="FAQ">
        <div className="faq__container">
            <h1 className="faq__header">F.A.Q.</h1>
            <Inner/>

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