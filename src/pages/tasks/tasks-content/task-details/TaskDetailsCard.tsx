import { ReactElement } from "react";

import { Box, Stack } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

import theme from "~/theme";
import { PageContainer } from "~/components/page-container";

import { Task } from "../TasksContent";

const styles = {
  taskTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 2,
  },
  infoSection: {
    display: "flex",
    alignItems: "center",
    marginBottom: 2,
  },
  tags: {
    comments: {
      borderRadius: "5px",
      backgroundColor: "#dedede",
      padding: "0 3px",
    },
    bug: {
      backgroundColor: theme.palette.error.main,
      borderRadius: "5px",
      padding: "2px 8px",
      color: "#FFFFFF",
    },
    needWork: {
      backgroundColor: theme.palette.warning.main,
      borderRadius: "5px",
      padding: "2px 8px",
      color: "#FFFFFF",
    },
  },
  marginBottom: {
    mbTwo: { marginBottom: 2 },
    mbFive: {
      marginBottom: 5,
    },
  },
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

const TaskDetailsCard = ({
  data,
  handleEdit,
}: TaskDetailsCardProps): ReactElement => {
  return (
    <PageContainer onClick={() => handleEdit(data)}>
      <div style={styles.taskTitle}>{data.taskTitle}</div>
      <div style={styles.marginBottom.mbFive}>{data.desc}</div>
      <div style={styles.infoSection}>
        <EventIcon style={{ marginRight: 5 }} />
        {data.date}
      </div>
      <div style={styles.marginBottom.mbTwo}>Sprint #{data.sprint}</div>
      <div style={styles.marginBottom.mbTwo}>
        Complexity Rating: {data.complexity}
      </div>

      <Stack direction={"row"} flexWrap="wrap" gap={0.5}>
        <Box
          style={styles.tags.comments}
          display={"flex"}
          alignItems={"center"}
        >
          <TextsmsOutlinedIcon style={{ padding: "2px" }} />
          <span style={{ marginRight: 3 }}>1</span>
        </Box>
        <Box style={styles.tags.bug}>Bug</Box>
        <Box style={styles.tags.needWork}>Needs Work</Box>

        <Stack direction={"row"} spacing={0.3} flexWrap="wrap">
          <EditOutlinedIcon
            color="action"
            style={{
              display:
                data.status !== "On Hold" && data.status !== "Backlog"
                  ? "none"
                  : "",
              cursor: "pointer",
            }}
          />
          <DeleteOutlinedIcon
            color="error"
            style={{
              display:
                data.status !== "On Hold" && data.status !== "Backlog"
                  ? "none"
                  : "",
              cursor: "pointer",
            }}
          />
        </Stack>
      </Stack>
    </PageContainer>
  );
};

export default TaskDetailsCard;
