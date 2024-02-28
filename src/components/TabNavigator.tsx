import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import { TabPanel } from "@mui/lab";
import TasksTable from "./TasksTable";
import { Dispatch, SetStateAction, useState } from "react";
import MorningRoutineTable from "./MorningRoutineTable";
import ChoresTable from "./ChoresTable";

type Props = {
  user: User;
  setUser: Dispatch<SetStateAction<Partial<User>>>;
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

export default function TabNavigator(props: Props) {
  const { user, setUser } = props;
  const [value, setValue] = useState("one");
  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <>
      <div>
        RequiredRoutines:{user.routinesRequired}
        CurrentRoutines:{user.routinesChecked}
      </div>
      RequiredChores:{user.choresRequired}
      Currentchores:{user.choresChecked}
      <div>
        requiredPOints:{user.pointsRequired}
        currentPoints:{user.pointsChecked}
      </div>
      <Box
        sx={{
          width: "100%",

          "& .MuiTabPanel-root": {
            padding: 0,
          },
        }}
      >
        <TabContext value={value}>
          <Tabs
            variant="fullWidth"
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
          >
            <Tab value="one" label="Morning Routine" />
            <Tab value="two" label="Daily Tasks" />
            <Tab value="three" label="Chores" />
          </Tabs>
          <TabPanel value="one">
            <MorningRoutineTable user={user} setUser={setUser} />
          </TabPanel>
          <TabPanel value="two">
            <TasksTable user={user} setUser={setUser} />
          </TabPanel>
          <TabPanel value="three">
            <ChoresTable user={user} setUser={setUser} />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
}
