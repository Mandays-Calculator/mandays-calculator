import { Typography } from "@mui/material";
import AlertAction from "./components/alert/AlertAction";
import Slider from "./components/slider/Slider";
import Stack from "@mui/material/Stack";

const cards = [
  {
    id: 1,
    title: "Sprint 1",
    estimated: "Estimated total Mandays:",
    percent1: 100,
    remaining: "Remaining Man Days",
    percent2: 50,
    annual: "Annual Leaves",
    percent3: 5,
  },
  {
    id: 2,
    title: "Sprint 2",
    estimated: "Estimated total Mandays:",
    percent1: 100,
    remaining: "Remaining Man Days",
    percent2: 50,
    annual: "Annual Leaves",
    percent3: 5,
  },
  {
    id: 3,
    title: "Sprint 3",
    estimated: "Estimated total Mandays:",
    percent1: 100,
    remaining: "Remaining Man Days",
    percent2: 50,
    annual: "Annual Leaves",
    percent3: 5,
  },
  {
    id: 4,
    title: "Sprint 4",
    estimated: "Estimated total Mandays:",
    percent1: 100,
    remaining: "Remaining Man Days",
    percent2: 50,
    annual: "Annual Leaves",
    percent3: 5,
  },
];

function Dashboard() {
  return (
    <>
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Typography
          sx={{
            fontSize: 18,
            fontStyle: "Montserrat",
            fontWeight: 600,
            color: "#414145",
            fontFamily: "Montserrat",
          }}
        >
          Notifications
        </Typography>
        <AlertAction
          message="Let's celebrate independence day! save the date, June 12, 2023."
          type="error"
        />
        <AlertAction
          message="Juan Dela Cruz commented on ticket named Task Name"
          type="error"
        />
        <AlertAction
          message="Juan Dela Cruz updated the status on ticket named Task Name"
          type="error"
        />
        <AlertAction
          message="Sprint X is coming to an end in X days. Check the details!"
          type="error"
        />
        <AlertAction
          message="Juan Dela Cruz commented on ticket number XXXX-XXXX"
          type="error"
        />
        <Typography
          sx={{
            fontSize: 18,
            fontStyle: "Montserrat",
            fontWeight: 600,
            color: "#414145",
            fontFamily: "Montserrat",
          }}
        >
          Active Sprints
        </Typography>
        <Slider cards={cards} />
      </Stack>
    </>
  );
}

export default Dashboard;
