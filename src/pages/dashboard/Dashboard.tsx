import React from "react";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { Card } from "~/components";
import { Charts } from "./components/charts";
import Slider from "./components/slider/Slider";
import AlertAction from "./components/alert/AlertAction";

const Dashboard: React.FC = () => {
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
    {
      id: 5,
      title: "Sprint 5",
      estimated: "Estimated total Mandays:",
      percent1: 100,
      remaining: "Remaining Man Days",
      percent2: 50,
      annual: "Annual Leaves",
      percent3: 5,
    },
  ];

  const overallData = [50, 25, 25];

  const totalResourceData = [50, 25, 25];
  const totalResourceLabel = ["Hong Kong", "Philippines", "China"];

  const sprintData = [10, 100, 20, 90, 30, 80, 40, 70, 50, 60];
  const sprintLabel = [
    "Sprint 1",
    "Sprint 2",
    "Sprint 3",
    "Sprint 4",
    "Sprint 5",
    "Sprint 6",
    "Sprint 7",
    "Sprint 8",
    "Sprint 9",
    "Sprint 10",
  ];

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

      <Stack spacing={3} alignItems="flex-start">
        <Card title="Overall Task Status">
          <Charts type="doughnut" data={overallData} />
        </Card>
        <Card title="Total Resource Percentage">
          <Charts
            type="doughnut"
            data={totalResourceData}
            labels={totalResourceLabel}
            colors={["primary", "info", "primary1"]}
          />
        </Card>
      </Stack>

      <Stack margin="1.5rem 0">
        <Card title="Sprint Utilization Percentage">
          <Charts
            type="bar"
            data={sprintData}
            labels={sprintLabel}
            colors={["primary", "info", "primary1"]}
          />
        </Card>
      </Stack>
    </>
  );
};

export default Dashboard;
