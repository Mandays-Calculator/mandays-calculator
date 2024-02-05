import type { AllTasksResponse } from "~/api/tasks/types";
import type { ReactElement } from "react";

import { useTranslation } from "react-i18next";

import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Box, Grid, Paper, Typography } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import LocalizationKey from "~/i18n/key";

import { taskDetailsCardStyles, getTagStyle, taskStyles } from "../style";
import { Status } from "../utils";

interface TaskDetailsCardProps {
  data: AllTasksResponse;
  handleViewDetails: (task: AllTasksResponse) => void;
  handleEdit: (task: AllTasksResponse) => void;
  onDelete: (id: string) => void;
}

const getContainerStyle = (status: string) => {
  if (status !== Status.OnHold && status !== Status.Backlog) {
    return { marginTop: 2, padding: 1.5, cursor: "default" };
  }

  return { marginTop: 2, padding: 1.5, cursor: "grab" };
};

const getButtonDisplayStyle = (status: string) => {
  if (status !== Status.OnHold && status !== Status.Backlog) {
    return { display: "none", cursor: "pointer" };
  }

  return { cursor: "pointer" };
};

const TaskDetailsCard = (props: TaskDetailsCardProps): ReactElement => {
  const { data, handleViewDetails, handleEdit, onDelete } = props;
  const { t } = useTranslation();

  return (
    <Paper
      elevation={2}
      sx={getContainerStyle(data?.status as string)}
      onClick={() => handleViewDetails(data)}
    >
      <Grid
        container
        spacing={2}
        display={"flex"}
        sx={taskStyles.gridRelativeContainer}
      >
        <Grid item xs={12}>
          <Typography sx={taskDetailsCardStyles.title}>{data?.name}</Typography>
        </Grid>

        <Grid item xs={12} sx={taskDetailsCardStyles.description}>
          <Typography>{data?.description}</Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography sx={taskDetailsCardStyles.completionDate}>
            <EventIcon sx={taskDetailsCardStyles.completionDateIcon} />
            {data?.completionDate}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography>
            {t(LocalizationKey.tasks.taskDetails.sprint) + data?.sprint}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography>
            {t(LocalizationKey.tasks.taskDetails.complexity) +
              data?.complexity?.name}
          </Typography>
        </Grid>

        <Grid item container spacing={1} alignItems="center" xs={10}>
          <Grid item>
            <Box
              sx={taskDetailsCardStyles.comments}
              display="flex"
              alignItems="center"
            >
              <TextsmsOutlinedIcon sx={taskDetailsCardStyles.commentIcon} />
              {data?.comments?.length}
            </Box>
          </Grid>

          {data?.tags &&
            data.tags.map((tag, index) => (
              <Grid item key={index}>
                <Box sx={getTagStyle(tag?.value)}>{tag.value}</Box>
              </Grid>
            ))}
        </Grid>

        <Box sx={taskDetailsCardStyles.buttons}>
          <EditOutlinedIcon
            color="action"
            sx={getButtonDisplayStyle(data.status as string)}
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(data);
            }}
          />

          <DeleteOutlinedIcon
            color="error"
            sx={getButtonDisplayStyle(data?.status as string)}
            onClick={(e) => {
              e.stopPropagation();
              onDelete(data.id as string);
            }}
          />
        </Box>
      </Grid>
    </Paper>
  );
};

export default TaskDetailsCard;
