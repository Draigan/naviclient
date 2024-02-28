import { useState } from "react";
import { postNewUser } from "../utils/axiosRequests";
import { Button, TextField } from "@mui/material";
import { useMutation, useQueryClient } from "react-query";

export default function AddUser() {
  const [inputValue, setInputValue] = useState("");
  const [invalidInput, setInvalidInput] = useState(false);
  const queryClient = useQueryClient();
  const { mutate } = useMutation(postNewUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("usersList");
    },
  });

  function handleAddNewUser() {
    if (inputValue === "") return setInvalidInput(true);
    // Add the new user to the server
    mutate(inputValue);
    setInputValue("");
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (inputValue !== "") setInvalidInput(false);
    setInputValue(event.target.value);
  }

  return (
    <div>
      <TextField
        variant="outlined"
        error={invalidInput ? true : false}
        value={inputValue}
        onChange={handleInputChange}
      />
      <Button
        onClick={handleAddNewUser}
        color={invalidInput ? "error" : "primary"}
        variant="contained"
      >
        Add New User
      </Button>
      {invalidInput && "*Username is required"}
    </div>
  );
}
