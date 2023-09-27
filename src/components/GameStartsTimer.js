import React, { useEffect, useState } from "react";

export default function GameStartsTimer({ setIsGamePlaying }) {
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    // Create a timer that decreases the seconds every second
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prev) => prev - 1);
      } else if (seconds === 0) {
        setIsGamePlaying(true);
      }
    }, 1000);

    // Cleanup the timer when the component unmounts
    return () => clearInterval(timer);
  }, [seconds]);

  return (
    <div>
      <h1>Timer: {seconds} seconds</h1>
    </div>
  );
}
