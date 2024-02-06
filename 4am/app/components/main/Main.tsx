import "./main.css";
import mainLogo from "../public/img/logo_main.webp";
import emailLogo from "../public/img/social_logo_svg/email_logo.svg";
import telegramLogo from "../public/img/social_logo_svg/telegram_logo.svg";
import xLogo from "../public/img/social_logo_svg/x_logo.svg";

export default function Main() {
  return (
    <section className="Main">
      <div className="main__content">
        <div className="main__left-block">
          <div className="main__left-block-content">
            {" "}
            <img src={mainLogo.src} className="main_logo" alt="Logo" />
            <h1>Keep your favourite items now digitally</h1>
            <h2>
              AXXIS transforms iconic clothing and footwear into unique NFTs.
              Own a piece of fashion, trade with ease, and step into a world
              where every item tells a story.
            </h2>
            {/* <div className="main_button">
              <a href="">Get Yours</a>
            </div> */}
            <div className="main_button"><a href="#presale"><button>Get yours</button></a></div>
            <div className="main__left-block-content-links">
              <div className="main-link">
                <a href="mailto:info@AXXISproject.io">
                  <img src={emailLogo.src} className="sl_logos" />
                </a>
                <a href="mailto:info@AXXISproject.io">
                  <p className="sl_text">info@AXXISproject.io</p>
                </a>
              </div>
              <div className="main-link">
                <a href="https://t.me/AXXISinfo">
                  <img src={telegramLogo.src} className="sl_logos" />
                </a>
                <a href="https://t.me/AXXISinfo">
                  <p className="sl_text">@AXXIS</p>
                </a>
              </div>
              <div className="main-link">
                <a href="https://twitter.com/XXS_crypto">
                  <img src={xLogo.src} className="sl_logos" />
                </a>
                <a href="https://twitter.com/XXS_crypto">
                  <p className="sl_text">@AXXIS_project</p>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="main__right-block"></div>
      </div>
    </section>
  );
}
