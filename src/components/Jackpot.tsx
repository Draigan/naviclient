import { useEffect, useState } from "react";
import { Winner } from "./winner";
import { Typography } from "@mui/material";

const Jackpot = ({
  setInJackpot,
}: {
  setInJackpot: (param: boolean) => void;
}) => {
  const [centerNumber, setCenterNumber] = useState(0);
  const [centerNumberTimer, setCenterNumberTimer] = useState<NodeJS.Timeout>();
  const [finalNumber, setFinalNumber] = useState<number | null>();
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  function handleBack() {
    setInJackpot(false);
  }

  function changeCenterNumber() {
    setCenterNumber(0);
    let firstRound = true;
    for (let i = Math.floor(Math.random() * 3000) + 1; i > 0; i--) {
      if (firstRound) {
        setTimeout(() => {
          setFinalNumber(i);
          console.log("finalNumber");
          console.log(finalNumber);
        }, i * 10),
          console.log(i);
        // setFinalNumber(i);
        firstRound = false;
      }
      // This gives us the jackpot number in little chunks for the animation
      setCenterNumberTimer(
        setTimeout(() => setCenterNumber((prev) => prev + 1), i * 10),
      );
    }
  }

  const handleFadeOut = () => {
    setIsButtonVisible(false);
  };

  useEffect(() => {
    return () => {
      clearTimeout(centerNumberTimer);
    };
  }, []);

  return (
    <div className="jackpot-container">
      <button onClick={handleBack} className="jackpot-back-button">
        BACK
      </button>
      <Winner finalNumber={finalNumber} />
      <div className="rainbow-text">
        <Typography variant="h1"> {centerNumber} </Typography>
      </div>
      {isButtonVisible && (
        <button
          className="jackpot-button"
          onClick={() => {
            handleFadeOut();
            changeCenterNumber();
          }}
        >
          SPIN
        </button>
      )}
    </div>
  );
};

export default Jackpot;
