"use client";
import { useEffect, useState } from "react";
import Countdown from "react-countdown";

type DateType = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
};

const CounterClock = () => {
  const [isClient, setIsClient] = useState(false); //this is for avoding hydration error

  useEffect(() => {
    setIsClient(true);
  }, []);
  const endingDate = new Date("2024-02-25");

  const renderer = ({ days, hours, minutes, seconds, completed }: DateType) => {
    if (completed) {
      // Render something when the countdown is completed
      return (
        <div className="text-2xl text-red-500 font-bold">
          The Offer has ended!
        </div>
      );
    } else {
      // Render a countdown
      return (
        <div className="text-2xl text-yellow-300 font-bold">
          {days} days, {hours} hours, {minutes} minutes, {seconds} seconds
        </div>
      );
    }
  };

  return <>{isClient && <Countdown date={endingDate} renderer={renderer} />}</>;
};

export default CounterClock;
