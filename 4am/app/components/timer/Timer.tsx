import "./timer.css";



export default function Timer() {
    return (
      <section className="Timer" id='presale'>
        <div className="timer__conteiner">
            <div className="timer__info">
              <h1 className="timer__info-title">Become a Part<br/>of Revolution Now</h1>
              <p className="timer__info-text">Introducing the AXXIS Token: your gateway to an exclusive digital fashion marketplace. Seize this presale opportunity to be among the first to access and trade in high-end fashion NFTs, revolutionizing how luxury is owned and experienced</p>
            </div>
            <div className="timer__content">
                <div className="timer__price">
                    <p className="timer__price1">Current price</p>
                    <p className="timer__price2">0.01$</p>
                </div>
                <div className="timer__adress">
                    <h2 className="timer__adress_title">Presale multi-signature wallet</h2>
                    <p className="timer__adress_text">0x18323f227a48d68a62Aaa344CA3a60C1742c04DD$</p>
                    <p className="timer__adress_copy">Click to copy</p>
                </div>
                <div className="timer__manual">
                    <h2 className="timer__manual_title">How to participate?</h2>
                    <ol className="timer__manual_list">
                        <li className="timer__manual_listpoint">Deposit ETH on your CEX/Metamask wallet</li>
                        <li className="timer__manual_listpoint">Copy multi-signature wallet address</li>
                        <li className="timer__manual_listpoint">Send desired amount of ETH to the wallet</li>
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



            </div>

        </div>


    </section >
    );
  }
  
