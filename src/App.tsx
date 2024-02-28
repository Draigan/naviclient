import { useEffect, useState } from "react";
import AddUser from "./components/AddUser";
import SelectUser from "./components/SelectUser";
import TabNavigator from "./components/TabNavigator";
import Jackpot from "./components/Jackpot";
import Header from "./components/Header";
import { Button } from "@mui/material";
import useCheckForNewDate from "./hooks/useCheckForNewDate";

type User = {
  userName: string;
  id: string;
  routinesRequired: null | number;
  pointsRequired: null | number;
  choresRequired: null | number;
  routinesChecked: null | number;
  pointsChecked: null | number;
  choresChecked: null | number;
};

function App() {
  const [inJackpot, setInJackpot] = useState(false);
  const [inUser, setInUser] = useState(true);
  const [isJackpotReady, setIsJackpotReady] = useState(true);
  const [user, setUser] = useState<Partial<User>>({
    userName: "diddy",
    id: "ebad6bb2-2fe3-4b8c-9025-0f7bedb865bc",
    routinesRequired: 0,
    pointsRequired: 10,
    choresRequired: 0,
    routinesChecked: null,
    pointsChecked: 0,
    choresChecked: 0,
  });

  function resetUserPoints() {
    setUser((prev) => ({
      ...prev,
      routinesChecked: 0,
      pointsChecked: 0,
      choresChecked: 0,
    }));
  }
  // Add a listener that checks if the dates change and resets checkboxes and user points
  useCheckForNewDate(resetUserPoints);

  // Check if jackpot is ready
  useEffect(() => {
    if (
      user.userName !== null &&
      user.pointsChecked !== null &&
      user.pointsChecked !== undefined &&
      user.pointsRequired !== null &&
      user.pointsRequired !== undefined &&
      user.routinesChecked === user.routinesRequired &&
      user.pointsChecked >= user.pointsRequired &&
      user.choresChecked === user.choresRequired
    ) {
      setIsJackpotReady(true);
      console.log("jackpotReady");
      console.log(user);
      console.log(isJackpotReady);
    } else {
      setIsJackpotReady(false);
    }
  }, [user]);

  // Simple but ugly routes, they do the trick

  // User select
  if (inUser) {
    return (
      <div className="app">
        <AddUser /> <SelectUser setUser={setUser} setInUser={setInUser} />
      </div>
    );
  }

  // Jackpot
  if (inJackpot) {
    return (
      <div className="app">
        <Jackpot setInJackpot={setInJackpot} />
      </div>
    );
  }

  // Main app
  return (
    <div className="app">
      <Header setInUser={setInUser} setUser={setUser} user={user as User} />
      <TabNavigator setUser={setUser} user={user as User} />
      {isJackpotReady && (
        <Button variant="contained" onClick={() => setInJackpot(true)}>
          SPIN TO WIN!
        </Button>
      )}
    </div>
  );
}

export default App;
