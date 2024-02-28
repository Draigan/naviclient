import { Typography } from "@mui/material";
import { useState, useEffect } from "react";

export function Winner({
  finalNumber,
}: {
  finalNumber: number | null | undefined;
}) {
  const [showWinner, setShowWinner] = useState(false);

  useEffect(() => {
    const flashInterval = setInterval(() => {
      setShowWinner((prev) => !prev);
    }, 200);
    return () => clearInterval(flashInterval);
  }, []);

  if (finalNumber) {
    if (finalNumber >= 2800) {
      return (
        <>
          <img
            className="jackpot-image"
            src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDV5Z21uZDNyanVtYTNta2F6cTAxcWRxNzI5cHlka2JtNWZxdTJpdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LdOyjZ7io5Msw/giphy.gif"
          />
          <div style={{ color: "green", opacity: showWinner ? 1 : 0 }}>
            <Typography variant="h1">
              <h1 className="rainbow-text">WINNER JACKPOT</h1>
            </Typography>
          </div>
        </>
      );
    }

    if (finalNumber >= 2000 && finalNumber < 2800) {
      return (
        <>
          <img
            className="jackpot-image"
            src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGI1ZXc1NmU2dDQwbGtsY282ZjVhMmhsMzRocnR5eGhkZWRrMHIyZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/SKGo6OYe24EBG/giphy.gif"
          />
          <div style={{ color: "green", opacity: showWinner ? 1 : 0 }}>
            <Typography variant="h1">
              <h1 className="rainbow-text">WINNER!!</h1>
            </Typography>
          </div>
        </>
      );
    }

    if (finalNumber < 2000) {
      return (
        <>
          <img
            className="jackpot-image"
            src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdzRlOWdrang0eGtsMWh1NnN1OTV4emY1bWE1NjVlMjZ3bnZ2cG94cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LSk5aGh2WYL6g/giphy.gif"
          />
          <div style={{ color: "red", opacity: showWinner ? 1 : 0 }}>
            <Typography variant="h4">Sorry Play Again</Typography>
          </div>
        </>
      );
    }
  }
}
