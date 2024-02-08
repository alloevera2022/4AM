import React, { useState, useEffect } from "react";

const Wait: React.FC = () => {
  const [days, setDays] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);


  useEffect(() => {
    const endDate = new Date("March 1, 2024 00:00:00").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const timeDifference = endDate - now;

      const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hoursLeft = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutesLeft = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const secondsLeft = Math.floor((timeDifference % (1000 * 60)) / 1000);

      setDays(daysLeft);
      setHours(hoursLeft);
      setMinutes(minutesLeft);
      setSeconds(secondsLeft);

      const totalTime = endDate - new Date("January 1, 2024 00:00:00").getTime();
      const timeElapsed = totalTime - timeDifference;
      const percentage = Math.floor((timeElapsed / totalTime) * 100);
      setProgress(percentage);
      
    };

    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="timer__clock">
      <h2 className="timer__clock_title">Until presale end</h2>
      <div className="timer__clock_nums">
        <div className="timer__clock_num">
          <h2 className="timer__clock_num-up">
            {days.toString().padStart(2, "0")}
          </h2>
          <h2 className="timer__clock_num-down">Days</h2>
        </div>
        <p className="timer__clock_nums_dots">:</p>
        <div className="timer__clock_num">
          <h2 className="timer__clock_num-up">
            {hours.toString().padStart(2, "0")}
          </h2>
          <h2 className="timer__clock_num-down">Hours</h2>
        </div>
        <p className="timer__clock_nums_dots">:</p>
        <div className="timer__clock_num">
          <h2 className="timer__clock_num-up">
            {minutes.toString().padStart(2, "0")}
          </h2>
          <h2 className="timer__clock_num-down">Minutes</h2>
        </div>
        <p className="timer__clock_nums_dots">:</p>
        <div className="timer__clock_num">
          <h2 className="timer__clock_num-up">
            {seconds.toString().padStart(2, "0")}
          </h2>
          <h2 className="timer__clock_num-down">Seconds</h2>
        </div>
      </div>
      <div className="timer__clock_timelineblock">
        <div className="timer__clock_timeline">
          <div className="timer__clock_timeline-progress" style={{ width: `${progress}%` }}>
            <div
              className="timer__clock_timeline-dot"
            ></div>
          </div>
        </div>
        <div className="timer__clock_percents">
          <p className="timer__clock_percent0">0%</p>
          <p className="timer__clock_percent100">100%</p>
        </div>
      </div>
    </div>
  );
};

export default Wait;
