import React, { useState, useEffect } from "react";
import "./DateAndTime.css";

function DateAndTime() {
  // Date

  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  const locale = "en";
  const [today, setDate] = useState(current); // Save the current date to be able to trigger an update

  useEffect(() => {
    const timer = setInterval(() => {
      // Creates an interval which will update the current data every second
      // This will trigger a rerender every component that uses the useDate hook.
      setDate(new Date());
    }, 1000);
    return () => {
      clearInterval(timer); // Return a function to clear the timer so that it will stop being called on unmount
    };
  }, []);

  const time = today.toLocaleTimeString(locale, {
    hour: "numeric",
    hour12: true,
    minute: "numeric",
    second: "numeric",
  });

  return (
    <div className="date">
      <h2>{date}</h2>

      <h3>{time}</h3>
    </div>
  );
}

export default DateAndTime;
