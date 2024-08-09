import { useEffect, useState } from "react";

const useTimer = (initialSeconds, callback) => {
  const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (remainingSeconds === 0) {
      callback();
    } else {
      const intervalId = setInterval(() => {
        setRemainingSeconds((previousValue) => previousValue - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [remainingSeconds]);

  const resetTimer = () => {
    setRemainingSeconds(initialSeconds);
  };

  return [remainingSeconds, resetTimer];
};

export default useTimer;
