import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import { useMutation, useQueryClient } from "react-query";
import { deleteUser } from "../utils/axiosRequests";
import { Dispatch, SetStateAction } from "react";

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

type Props = {
  data: { userName: string; id: string }[];
  setInUser: (param: boolean) => void;
  setUser: Dispatch<SetStateAction<Partial<User>>>;
};

export default function SelectUserButtons(props: Props) {
  const { data, setInUser, setUser } = props;
  const queryClient = useQueryClient();
  const { mutate } = useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("usersList");
    },
  });
  const buttons: JSX.Element[] = [];
  function handleClickUser(id: string, userName: string) {
    // Set the current user
    setUser((prev) => ({
      ...prev,
      id: id,
      userName: userName,
    }));
    // Ghetto route change
    setInUser(false);
  }

  console.log(data, "from userButtons");
  data?.forEach((user, index) =>
    buttons.push(
      <>
        <Button
          onClick={() => handleClickUser(user.id, user.userName)}
          key={`${index}`}
        >
          {user.userName} {user.id}
        </Button>
        <Button onClick={() => mutate(user.id)} key={`${index}`}>
          delete
        </Button>
      </>,
    ),
  );

  return (
    <Box
      sx={{
        display: "flex",
        "& > *": {
          m: 1,
        },
      }}
    >
      <ButtonGroup
        orientation="vertical"
        aria-label="Vertical button group"
        variant="outlined"
      >
        {buttons}
      </ButtonGroup>
    </Box>
  );
}
