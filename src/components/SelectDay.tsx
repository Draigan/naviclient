import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import getDay from "../utils/getDay";

type Props = {
  setDay: (param: string) => void;
};
export default function SelectDay(props: Props) {
  const { setDay } = props;
  const [inputValue, setInputValue] = React.useState(getDay());

  const handleChange = (event: SelectChangeEvent) => {
    setDay(event.target.value);
    setInputValue(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">Day</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={inputValue}
        label="Day"
        onChange={handleChange}
      >
        <MenuItem value="Sunday">Sunday</MenuItem>
        <MenuItem value="Monday">Monday</MenuItem>
        <MenuItem value="Tuesday">Tuesday</MenuItem>
        <MenuItem value="Wednesday">Wednesday</MenuItem>
        <MenuItem value="Thursday">Thursday</MenuItem>
        <MenuItem value="Friday">Friday</MenuItem>
        <MenuItem value="Saturday">Saturday</MenuItem>
      </Select>
    </FormControl>
  );
}
