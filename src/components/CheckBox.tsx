import { Checkbox } from "@mui/material";
import { useEffect, useState } from "react";

type User = {
  routinesChecked: number;
  choresChecked: number;
  pointsChecked: number;
};
// type CheckBox = {
//   setUser: Dispatch<SetStateAction<Partial<User>>>;
//   pointValue: number;
//   type: string;
//   id: string;
//
// }
export const CheckBox = ({ setUser, pointValue, type, id }: any) => {
  const [data, setData] = useState(localStorage.getItem(id));
  const [checked, setChecked] = useState(false);
  // localStorage.clear();

  // Sync checked with data
  useEffect(() => {
    if (
      data === null ||
      data === "" ||
      data === undefined ||
      data === "false"
    ) {
      setChecked(false);
    } else {
      setChecked(true);
    }
  }, [data]);

  // Listen for storage changes and sync data to the local storage
  useEffect(() => {
    let data = localStorage.getItem(id);
    setData(data);
  }, []);

  // Set an interval to check for storage changes
  // This is just for when the day changes we need to clear the checkboxes
  useEffect(() => {
    const interval = setInterval(() => {
      let data = localStorage.getItem(id);
      if (data === "true") {
        setChecked(true);
      } else {
        setChecked(false);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Add the initial points for checked boxes on mount
  useEffect(() => {
    if (type === "task") {
      if (data === "true")
        setUser((prev: User) => ({
          ...prev,
          pointsChecked: prev.pointsChecked + pointValue,
        }));
    }

    if (type === "morning") {
      if (data === "true")
        setUser((prev: User) => ({
          ...prev,
          routinesChecked: prev.routinesChecked + 1,
        }));
    }

    if (type === "chore") {
      if (data === "true")
        setUser((prev: User) => ({
          ...prev,
          choresChecked: prev.choresChecked + 1,
        }));
    }
  }, []);

  const handleCheckboxChange = () => {
    if (
      data === null ||
      data === "" ||
      data === undefined ||
      data === "false"
    ) {
      localStorage.setItem(id, "true");
      setData("true");
    } else {
      localStorage.setItem(id, "false");
      setData("false");
    }

    if (type === "task") {
      if (!checked)
        setUser((prev: User) => ({
          ...prev,
          pointsChecked: prev.pointsChecked + pointValue,
        }));
      if (checked)
        setUser((prev: User) => ({
          ...prev,
          pointsChecked: prev.pointsChecked - pointValue,
        }));
    }

    if (type === "morning") {
      if (!checked)
        setUser((prev: User) => ({
          ...prev,
          routinesChecked: prev.routinesChecked + 1,
        }));
      if (checked)
        setUser((prev: User) => ({
          ...prev,
          routinesChecked: prev.routinesChecked - 1,
        }));
    }

    if (type === "chore") {
      if (!checked)
        setUser((prev: User) => ({
          ...prev,
          choresChecked: prev.choresChecked + 1,
        }));
      if (checked)
        setUser((prev: User) => ({
          ...prev,
          choresChecked: prev.choresChecked - 1,
        }));
    }
  };

  return <Checkbox checked={checked} onClick={handleCheckboxChange} />;
};
