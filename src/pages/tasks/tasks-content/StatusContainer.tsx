import type { AllTasksResponse } from "~/api/tasks";
import type { ReactElement } from "react";

import { Draggable, Droppable } from "react-beautiful-dnd";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

import { Divider, Grid, IconButton, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LocalizationKey from "~/i18n/key";
import "simplebar-react/dist/simplebar.min.css";
import SimpleBarReact from "simplebar-react";

import { useTasks } from "~/queries/tasks/Tasks";
import { ErrorMessage } from "~/components";

import TaskDetailsCard from "./task-details";
import { Status, StatusValues } from "./utils";
import {
  StyledCreateTaskIconButton,
  StyledStatusContainer,
  StyledStatusTitle,
  calculateGridSize,
} from "./style";

interface StatusContainer {
  status: Status;
  teamId: string;
  handleViewDetailsModalState: (task: AllTasksResponse) => void;
  handleCreateModalState: () => void;
  handleUpdateModalState: (task: AllTasksResponse) => void;
  handleDeleteModalState: (task: AllTasksResponse) => void;
}

const StatusContainer = (props: StatusContainer): ReactElement => {
  const {
    status,
    teamId,
    handleViewDetailsModalState,
    handleCreateModalState,
    handleUpdateModalState,
    handleDeleteModalState,
  } = props;

  const { t } = useTranslation();
  const [tasks, setTasks] = useState<AllTasksResponse[]>([]);

  const { data: tasksData } = useTasks(
    teamId,
    StatusValues[status].toString(),
    "5",
    "1",
  );

  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (tasksData && tasksData.hasOwnProperty("errorCode")) {
      setErrorMessage(t(LocalizationKey.tasks.errorMessage.fetch));
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    } else if (tasksData) {
      setTasks(tasksData.data);
    }
  }, [tasksData]);

  // RENDER
  const renderStatusContainerHeader = (status: Status) => {
    return (
      <Grid item container alignItems={"center"}>
        <Grid item xs={11}>
          <StyledStatusTitle color={status}>{status}</StyledStatusTitle>
        </Grid>

        <Grid item xs={1}>
          <StyledCreateTaskIconButton display={status}>
            <IconButton onClick={() => handleCreateModalState()}>
              <AddIcon />
            </IconButton>
          </StyledCreateTaskIconButton>
        </Grid>
      </Grid>
    );
  };

  const renderTaskDetailsCards = (task: AllTasksResponse, index: number) => {
    if (task?.id) {
      if (task.status === Status.Backlog || task.status === Status.OnHold) {
        return (
          <Draggable key={task.id} draggableId={task?.id} index={index}>
            {provided => (
              <Stack
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <TaskDetailsCard
                  data={task}
                  handleViewDetails={handleViewDetailsModalState}
                  handleEdit={handleUpdateModalState}
                  onDelete={() => handleDeleteModalState(task)}
                />
              </Stack>
            )}
          </Draggable>
        );
      } else {
        return (
          <TaskDetailsCard
            data={task}
            handleViewDetails={handleViewDetailsModalState}
            handleEdit={handleUpdateModalState}
            onDelete={() => handleDeleteModalState(task)}
          />
        );
      }
    } else {
      return null;
    }
  };

  return (
    <>
      <Grid
        item
        container
        xs={calculateGridSize(Object.values(Status).length - 1)}
        key={status}
      >
        <Droppable droppableId={status}>
          {provided => (
            <StyledStatusContainer
              backgroundColor={status}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {renderStatusContainerHeader(status)}

              <Divider />

              <SimpleBarReact style={{ maxHeight: "410px" }}>
                {tasks.map((task, index) => (
                  <Stack key={`${status}_${task.name}_${index}`}>
                    {renderTaskDetailsCards(task, index)}
                  </Stack>
                ))}
                {provided.placeholder}
              </SimpleBarReact>
            </StyledStatusContainer>
          )}
        </Droppable>
      </Grid>

      <ErrorMessage error={errorMessage} type='alert' />
    </>
  );
};

export default StatusContainer;
