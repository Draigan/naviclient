import { useEffect } from "react";
import getDay from "../utils/getDay";

export default function useCheckForNewDate(resetPoints: () => void) {
  function checkForNewDay() {
    const today = getDay();
    const storageToday = localStorage.getItem("today");

    if (today !== storageToday) {
      console.log("new day detected");
      localStorage.setItem("today", today);

      // Reset all the user points
      resetPoints();

      // Reset the checkboxes
      for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        // Go through all the checkboxes and reset them
        // Leave out the only storage entry that isnt a checkbox
        if (key !== "today") {
          if (key) localStorage.setItem(key, "false");
        }
      }
    }
  }

  useEffect(() => {
    const intervalIsh = setInterval(() => {
      checkForNewDay();
    }, 1000);

    return () => clearInterval(intervalIsh);
  }, []);
}
