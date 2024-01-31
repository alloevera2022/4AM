import "./section1.css";
import section1Img1 from '../public/img/section2_img1.webp';
import section1Img2 from '../public/img/section2_img2.webp';






export default function Section1() {
    return (
      <section className="Section1" id='about'>
        <div className="section1__container">
            <h2 className="section1-subtitle">Welcome to AXXIS</h2>
            <div className="section1__title-container">
                <h1 className="section1__title">The Future of Fashion World</h1>
                <button className="section1__title-button"><span>Coming soon</span></button>
            </div>
            <ul className="section1__content-blog">
                <li className="section1__content-blog_item" id="element1">
                    <img className="section1__content-blog_img" src={section1Img1.src} alt="section1Img1" />
                    <div className="section1__content-blog_text">
                        <div className="section1__content-blog_text-titleblog">
                            <h1 className="section1__content-blog_text-title">NFT Floor</h1>
                            <p className="section1__content-blog_text-title-num">1</p>
                        </div>
                        <h2 className="section1__content-blog_text-subtitle">The NFT Floor features brand-exclusive, one-of-a-kind fashion items, accessible with unique keys for each brand.</h2>
                    

                    </div>
                </li>

                <li className="section1__content-blog_item " id="element2">
                    <img className="section1__content-blog_img" src={section1Img2.src} alt="section1Img1" />
                    <div className="section1__content-blog_text">
                        <div className="section1__content-blog_text-titleblog">
                            <h1 className="section1__content-blog_text-title">Secondary Floor</h1>
                            <p className="section1__content-blog_text-title-num">2</p>
                        </div>
                        <h2 className="section1__content-blog_text-subtitle">The Secondary and Celebrity Floors offer a platform for trading and auctioning high-value fashion NFTs, with exclusive access for different membership levels.</h2>
                    </div>
                </li>
                <li className="section1__content-blog_item"></li>
            </ul>
        </div>

    </section >
    );
  }