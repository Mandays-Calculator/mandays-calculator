import type { AllTasksResponse } from "~/api/tasks/types";
import type { ReactElement } from "react";

import { useTranslation } from "react-i18next";

import { Grid, Typography } from "@mui/material";
import LocalizationKey from "~/i18n/key";

import {
  StyledTextsmsOutlinedIcon,
  StyledDeleteOutlinedIcon,
  TaskDetailsCardDetails,
  StyledEditOutlinedIcon,
  GridRelativeContainer,
  TaskActionContainer,
  CommentContainer,
  StyledEventIcon,
  StyledPaper,
  TaskTags,
} from "../style";

interface TaskDetailsCardProps {
  data: AllTasksResponse;
  handleViewDetails: (task: AllTasksResponse) => void;
  handleEdit: (task: AllTasksResponse) => void;
  onDelete: (task: AllTasksResponse) => void;
}

const TaskDetailsCard = (props: TaskDetailsCardProps): ReactElement => {
  const { data, handleViewDetails, handleEdit, onDelete } = props;
  const { t } = useTranslation();

  return (
    <StyledPaper
      status={data?.status}
      elevation={2}
      onClick={() => handleViewDetails(data)}
    >
      <GridRelativeContainer container spacing={2} display={"flex"}>
        <Grid item xs={12}>
          <TaskDetailsCardDetails type='title'>
            {data?.name}
          </TaskDetailsCardDetails>
        </Grid>

        <Grid item xs={12}>
          <TaskDetailsCardDetails type='description'>
            {data?.description}
          </TaskDetailsCardDetails>
        </Grid>

        <Grid item xs={12}>
          <TaskDetailsCardDetails type='createDate'>
            <StyledEventIcon />
            {data?.createdDate}
          </TaskDetailsCardDetails>
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

        <Grid item container spacing={1} alignItems='center' xs={10}>
          <Grid item>
            <CommentContainer display='flex' alignItems='center'>
              <StyledTextsmsOutlinedIcon />
              {data?.comments?.length}
            </CommentContainer>
          </Grid>

          {data?.tags.map((tag, index) => (
            <Grid item>
              <TaskTags status={tag?.value} key={index}>
                {tag?.value}
              </TaskTags>
            </Grid>
          ))}
        </Grid>

        <TaskActionContainer>
          <StyledEditOutlinedIcon
            status={data?.status}
            color='action'
            onClick={e => {
              e.stopPropagation();
              handleEdit(data);
            }}
          />

          <StyledDeleteOutlinedIcon
            status={data?.status}
            color='error'
            onClick={e => {
              e.stopPropagation();
              onDelete(data);
            }}
          />
        </TaskActionContainer>
      </GridRelativeContainer>
    </StyledPaper>
  );
};

export default TaskDetailsCard;
