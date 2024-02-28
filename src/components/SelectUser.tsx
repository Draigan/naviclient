import { useQuery } from "react-query";
import { getAllUserNames } from "../utils/axiosRequests";
import SelectUserButtons from "./SelectUserButtons";
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

export default function SelectUser({
  setInUser,
  setUser,
}: {
  setInUser: (param: boolean) => void;
  setUser: Dispatch<SetStateAction<Partial<User>>>;
}) {
  const { data, status } = useQuery("usersList", getAllUserNames);
  if (status !== "loading") {
    return (
      <div>
        <SelectUserButtons
          data={data}
          setUser={setUser}
          setInUser={setInUser}
        />
      </div>
    );
  } else {
    return "Loading";
  }
}
