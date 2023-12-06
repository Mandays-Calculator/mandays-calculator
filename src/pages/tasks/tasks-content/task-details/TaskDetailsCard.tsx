import { ReactElement } from "react";

import { Box, Stack } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

import { PageContainer } from "~/components/page-container";

import { Task } from "../TasksContent";

const styles = {
  taskTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 2,
  },
  description: {
    marginBottom: 5,
  },
  infoSection: {
    display: "flex",
    alignItems: "center",
    marginBottom: 2,
  },
  // Define other styles similarly for different elements
};

interface TaskDetailsCardProps {
  data: {
    taskTitle: string;
    desc: string;
    date: string;
    sprint: string;
    complexity: string;
    status: string;
    type: string;
    functionality: string;
    comments: {
      name: string;
      comment: string;
    }[];
  };
  handleEdit: (task: Task) => void;
}

const TaskDetailsCard = ({ data, handleEdit }: TaskDetailsCardProps): ReactElement => {
  return (
    <PageContainer>
      <div>
        <div style={styles.taskTitle}>
          {data.taskTitle}
        </div>
        <div style={styles.description}>{data.desc}</div>
        <div style={styles.infoSection}>
          <EventIcon style={{ marginRight: 5 }} />
          {data.date}
        </div>
        <div style={{ marginBottom: 2 }}>Sprint #{data.sprint}</div>
        <div style={{ marginBottom: 2 }}>
          Complexity Rating: {data.complexity}
        </div>

        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          flexWrap="wrap"
        >
          <Stack direction="row" gap={0.5}>
            <Box
              sx={{ borderRadius: "5px", bgcolor: "#dedede", padding: "0 3px" }}
              display={"flex"}
              alignItems={"center"}
            >
              <TextsmsOutlinedIcon sx={{ padding: "2px" }} />
              <span style={{ marginRight: 3 }}>1</span>
            </Box>
            <Box
              sx={{
                borderRadius: "5px",
                bgcolor: "error.main",
                padding: "2px 8px",
                color: "#FFFFFF",
              }}
            >
              Bug
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
          <Stack display={"flex"} direction={"row"} spacing={0.3}>
            <EditOutlinedIcon
              color="action"
              sx={{
                display:
                  data.status !== "On Hold" && data.status !== "Backlog"
                    ? "none"
                    : "",
                    cursor: "pointer"
              }}
              onClick={() => handleEdit(data)}

            />
            <DeleteOutlinedIcon
              color="error"
              sx={{
                display:
                  data.status !== "On Hold" && data.status !== "Backlog"
                    ? "none"
                    : "",
                    cursor: "pointer"
              }}
            />
          </Stack>
        </Stack>
      </div>
    </PageContainer>
  );
};

export default TaskDetailsCard;
