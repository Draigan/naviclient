import HamburgerMenu from "./HamburgerMenu";
import logo from "../assets/logo.png";
import { Dispatch, SetStateAction } from "react";

type Props = {
  user: User;
  setUser: Dispatch<SetStateAction<Partial<User>>>;
  setInUser: (param: boolean) => void;
};

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

export default function Header(props: Props) {
  const { setInUser, user, setUser } = props;
  return (
    <div className="header">
      <div>
        <img className="logo" src={logo} />
        NAVI
      </div>
      <HamburgerMenu setInUser={setInUser} setUser={setUser} user={user} />
    </div>
  );
}
