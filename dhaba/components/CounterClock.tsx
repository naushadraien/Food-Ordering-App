"use client";
import { useEffect, useState } from "react";
import Countdown from "react-countdown";

const CounterClock = () => {
  const [isClient, setIsClient] = useState(false); //this is for avoding hydration error

  useEffect(() => {
    setIsClient(true);
  }, []);
  const endingDate = new Date("2023-10-20");
  return (
    <>
      {isClient && (
        <Countdown
          date={endingDate}
          className="text-5xl text-yellow-300 font-bold"
        />
      )}
    </>
  );
};

export default CounterClock;
