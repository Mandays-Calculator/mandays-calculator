import { ReactElement } from "react";

import { Box, Stack } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

import { PageContainer } from "~/components/page-container";

interface TaskDetailsCardProps {
  data: {
    taskTitle: string;
    desc: string;
    date: string;
    sprint: string;
    complexity: string;
    status: string;
    type: string;
  };
}

const TaskDetailsCard = ({ data }: TaskDetailsCardProps): ReactElement => {
  return (
    <PageContainer>
      <div>
        <div style={{ fontSize: 16, fontWeight: "bold", marginBottom: 5 }}>
          {data.taskTitle}
        </div>
        <div style={{ marginBottom: 5 }}>{data.desc}</div>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 5 }}>
          <EventIcon style={{ marginRight: 5 }} />
          {data.date}
        </div>
        <div style={{ marginBottom: 5 }}>Sprint #{data.sprint}</div>
        <div style={{ marginBottom: 5 }}>
          Complexity Rating: {data.complexity}
        </div>
        <Stack
          display={"flex"}
          direction={"row"}
          justifyContent={"space-between"}
        >
          <Stack direction={"row"} spacing={1}>
            <Box
              sx={{ borderRadius: "5px", bgcolor: "#dedede", padding: "0 3px" }}
              display={"flex"}
              alignItems={"center"}
            >
              <TextsmsOutlinedIcon sx={{ padding: "2px" }} />{" "}
              <span style={{ marginRight: 3 }}>1</span>
            </Box>
            <Box
              sx={{
                borderRadius: "5px",
                bgcolor: "error.main",
                padding: "2px 8px",
              }}
            >
              <Box sx={{ color: "#FFFFFF" }}>Bug</Box>
            </Box>
            <Box
              sx={{
                borderRadius: "5px",
                bgcolor: "warning.main",
                padding: "2px 8px",
              }}
            >
              <Box sx={{ color: "#FFFFFF" }}>Needs Work</Box>
            </Box>
          </Stack>
          <Stack display={"flex"} direction={"row"} spacing={1}>
            <EditOutlinedIcon
              color="primary"
              style={{
                display:
                  data.status !== "On Hold" && data.status !== "Backlog"
                    ? "none"
                    : "",
              }}
            />
            <DeleteOutlinedIcon
              color="error"
              style={{
                display:
                  data.status !== "On Hold" && data.status !== "Backlog"
                    ? "none"
                    : "",
              }}
            />
          </Stack>
        </Stack>
      </div>
    </PageContainer>
  );
};

export default TaskDetailsCard;
