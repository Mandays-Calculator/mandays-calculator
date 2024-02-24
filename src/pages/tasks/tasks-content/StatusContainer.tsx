import type { AllTasksResponse, ForTaskStateChange } from "~/api/tasks";
import React, { useEffect, useRef, useState, ReactElement } from "react";

import { Draggable, Droppable } from "react-beautiful-dnd";
import { useTranslation } from "react-i18next";

import { Divider, Grid, IconButton, Stack } from "@mui/material";
import "simplebar-react/dist/simplebar.min.css";
import AddIcon from "@mui/icons-material/Add";
import LocalizationKey from "~/i18n/key";

import { useTasks } from "~/queries/tasks/Tasks";
import { ErrorMessage } from "~/components";

import { Status, StatusValues } from "./utils";
import TaskDetailsCard from "./task-details";
import {
  StyledCreateTaskIconButton,
  StyledStatusContainer,
  StyledStatusTitle,
  calculateGridSize,
  StyledSimpleBar,
} from "./style";

interface StatusContainer {
  status: Status;
  teamId: string;
  hasTaskStateChange: ForTaskStateChange | null;
  resetHasTaskStateChange: () => void;
  handleViewDetailsModalState: (task: AllTasksResponse) => void;
  handleCreateModalState: () => void;
  handleUpdateModalState: (task: AllTasksResponse) => void;
  handleDeleteModalState: (task: AllTasksResponse) => void;
}

const StatusContainer = (props: StatusContainer): ReactElement => {
  const scrollableNodeRef = React.createRef<HTMLDivElement>();

  const {
    status,
    teamId,
    hasTaskStateChange,
    resetHasTaskStateChange,
    handleViewDetailsModalState,
    handleCreateModalState,
    handleUpdateModalState,
    handleDeleteModalState,
  } = props;

  const { t } = useTranslation();
  const [tasks, setTasks] = useState<AllTasksResponse[]>([]);
  const [page, setPage] = useState<number>(1);

  const {
    data: tasksData,
    refetch,
    isLoading,
  } = useTasks(teamId, StatusValues[status].toString(), "10", page.toString());

  const [errorMessage, setErrorMessage] = useState<string>("");

  const tasksDataRef = useRef(tasksData);

  useEffect(() => {
    if (hasTaskStateChange) {
      switch (hasTaskStateChange.type) {
        case "change_status":
          if (status === Status.Backlog || status === Status.OnHold) {
            refreshTaskList();
          }
          break;
        case "create_task":
          if (status === Status.Backlog) {
            refreshTaskList();
          }
          break;
        case "update_task":
        case "delete_task":
          if (status === hasTaskStateChange.task?.status) {
            refreshTaskList();
          }
          break;
        case "mark_completed":
          if (status === Status.InProgress || status === Status.Completed) {
            refreshTaskList();
          }
          break;
      }
    }
  }, [hasTaskStateChange]);

  useEffect(() => {
    setTasks([]);

    if (scrollableNodeRef.current) {
      scrollableNodeRef.current.scrollTop = 0;
    }

    if (page !== 1) {
      setPage(1);
    }

    refetchIndicator();
  }, [teamId]);

  useEffect(() => {
    if (tasksData && tasksData.hasOwnProperty("errorCode")) {
      setErrorMessage(t(LocalizationKey.tasks.errorMessage.fetch));
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    } else if (tasksData) {
      setTasks(prevTasks => [...prevTasks, ...tasksData.data]);
    }
  }, [tasksData]);

  useEffect(() => {
    tasksDataRef.current = tasksData;
  }, [tasksData]);

  // useEffect for lazy loading
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (
          tasksDataRef.current &&
          page > 1 &&
          page <= tasksDataRef.current.page.lastPage
        ) {
          await refetch();
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [page, refetch]);

  // useEffect for reset list
  useEffect(() => {
    refetchIndicator();
  }, [page, refetch]);

  // OTHERS
  const handleScroll = (event: React.UIEvent) => {
    const target = event.target as HTMLDivElement;

    const isAtBottom =
      target.scrollHeight - target.scrollTop <= target.clientHeight + 100;

    if (tasksDataRef.current !== undefined) {
      if (
        isAtBottom &&
        !isLoading &&
        page < tasksDataRef.current?.page.lastPage
      ) {
        setPage(prevPage => prevPage + 1);
      }
    }
  };

  const refreshTaskList = () => {
    if (scrollableNodeRef.current) {
      scrollableNodeRef.current.scrollTop = 0;
    }

    setTasks([]);

    if (page !== 1) {
      setPage(1);
    } else {
      refetchIndicator();
    }
  };

  const refetchIndicator = () => {
    if (hasTaskStateChange) {
      refetch()
        .then(() => resetHasTaskStateChange())
        .catch(error => {
          console.log(error);
        });
    } else {
      refetch().catch(error => {
        console.log(error);
      });
    }
  };

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

              <StyledSimpleBar
                scrollableNodeProps={{
                  ref: scrollableNodeRef,
                  onScroll: handleScroll,
                }}
              >
                {tasks.map((task, index) => (
                  <Stack key={`${status}_${task.name}_${index}`}>
                    {renderTaskDetailsCards(task, index)}
                  </Stack>
                ))}
                {provided.placeholder}
              </StyledSimpleBar>
            </StyledStatusContainer>
          )}
        </Droppable>
      </Grid>

      <ErrorMessage error={errorMessage} type='alert' />
    </>
  );
};

export default StatusContainer;
