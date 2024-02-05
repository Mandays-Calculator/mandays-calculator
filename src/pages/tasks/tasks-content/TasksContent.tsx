import type { AllTasksResponse } from "~/api/tasks/types";
import type { ReactElement } from "react";

import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import {
  DragDropContext,
  DropResult,
  Draggable,
  Droppable,
} from "react-beautiful-dnd";

import AddIcon from "@mui/icons-material/Add";
import LocalizationKey from "~/i18n/key";
import {
  SelectChangeEvent,
  Typography,
  IconButton,
  Divider,
  Stack,
  Grid,
} from "@mui/material";

import { Select, PageContainer, ErrorMessage } from "~/components";
import { useCommonOption } from "~/queries/common/options";
import { useTasks, useDeleteTask } from "~/queries/tasks/Tasks";
import { ConfirmModal } from "~/components";
import { useUserAuth } from "~/hooks/user";

import TaskDetailsCard from "./task-details/TaskDetailsCard";
import CreateOrUpdateTask from "./CreateOrUpdateTask";
import ViewTaskDetails from "./ViewTaskDetails";
import { Status } from "./utils";

import NoTask from "~/assets/img/empty_tasks.png";

import {
  StyledCreateTaskIconButton,
  StyledStatusTitle,
  TaskGridContainer,
  NoDataContainer,
  StatusContainer,
  StyledDivider,
  StyledLink,
} from "./style";

const teamOptions = [
  { value: "MC", label: "MC" },
  { value: "BME", label: "BME" },
  { value: "eMPF", label: "eMPF" },
  { value: "CMT", label: "CMT" },
];

const calculateGridSize = (numStatuses: number): number => {
  return 12 / numStatuses;
};

const TasksContent = (): ReactElement => {
  const { t } = useTranslation();

  const {
    state: { user },
  } = useUserAuth();
  const [tasks, setTasks] = useState<AllTasksResponse[]>([]);
  const { data: tasksData } = useTasks(
    "a2eb9f01-6e4e-11ee-8624-a0291936d1c2",
    "1",
  );
  const username = `${user?.firstName} ${user?.lastName}`;
  const complexities = useCommonOption("complexity");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [selectedTeam, setSelectedTeam] = useState<string | null>("");
  const [selectedTask, setSelectedTask] = useState<AllTasksResponse | null>(
    null,
  );
  const [selectedTaskForDelete, setSelectedTaskForDelete] =
    useState<AllTasksResponse | null>(null);

  const [viewDetailsModalOpen, setViewDetailsModalOpen] =
    useState<boolean>(false);
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const deleteMutation = useDeleteTask();

  useEffect(() => {
    if (tasksData && tasksData.hasOwnProperty("errorCode")) {
      setErrorMessage(t(LocalizationKey.tasks.errorMessage.fetch));
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    } else if (tasksData && tasksData.data) {
      setTasks(tasksData.data);
    }
  }, [tasksData]);

  // OTHERS
  const generateUniqueTaskID = () => {
    const timestamp = new Date().getTime();
    return timestamp.toString();
  };

  const handleTeamFilter = (e: SelectChangeEvent<unknown>) => {
    setSelectedTeam(e.target.value as string);
  };

  // DRAG N DROP
  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    const sourceStatus = source.droppableId;
    const destinationStatus = destination.droppableId;

    const draggedTask = tasks.find(task => task.taskID === draggableId);

    if (
      (sourceStatus === Status.Backlog &&
        destinationStatus === Status.OnHold) ||
      (sourceStatus === Status.OnHold && destinationStatus === Status.Backlog)
    ) {
      if (draggedTask) {
        const updatedMockData = tasks.map(task => {
          if (task.taskID === draggableId) {
            return {
              ...task,
              status: destinationStatus,
            };
          }
          return task;
        });

        setTasks(updatedMockData);
      }
    }
  };

  // OPENING OF MODALS
  const handleViewDetailsModalState = (task: AllTasksResponse) => {
    setSelectedTask(task);
    setViewDetailsModalOpen(!viewDetailsModalOpen);
  };

  const handleCreateModalState: () => void = () => {
    setCreateModalOpen(!createModalOpen);
  };

  const handleUpdateModalState = (task: AllTasksResponse) => {
    setSelectedTask(task);
    setUpdateModalOpen(!updateModalOpen);
  };

  const handleDeleteModalState = (task: AllTasksResponse) => {
    setSelectedTaskForDelete(task);
    setDeleteModalOpen(!deleteModalOpen);
  };

  // CLOSING OF MODALS
  const handleCloseViewDetailsModalState = () => {
    setViewDetailsModalOpen(false);
  };

  const handleCloseCreateModalState = () => {
    setCreateModalOpen(false);
  };

  const handleCloseUpdateModalState = () => {
    setUpdateModalOpen(false);
  };

  const handleCloseDeleteModalState = () => {
    setDeleteModalOpen(false);
  };

  // CRUD
  const handleCreateTask = (newTask: AllTasksResponse | null) => {
    if (newTask) {
      const newTaskID = generateUniqueTaskID();

      const createdTask = {
        ...newTask,
        taskID: newTaskID,
      };

      const createdData = [...tasks, createdTask];

      setTasks(createdData);
    }
  };

  const handleUpdateTask = (updatedTask: AllTasksResponse): void => {
    const updatedData = tasks.map(task => {
      if (task.taskID === updatedTask.taskID) {
        return updatedTask;
      }

      return task;
    });

    setTasks(updatedData);
  };

  const handleDeleteTask = () => {
    if (selectedTaskForDelete?.taskID) {
      const { taskID } = selectedTaskForDelete;

      deleteMutation.mutate(
        { id: taskID },
        {
          onSuccess: () => {
            const updatedTasks = tasks.filter(task => task.taskID !== taskID);
            setTasks(updatedTasks);
            setSelectedTaskForDelete(null);
          },
          onError: error => {
            console.log(error);
          },
        },
      );
    }

    handleCloseDeleteModalState();
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
    if (task?.taskID) {
      if (task.status === Status.Backlog || task.status === Status.OnHold) {
        return (
          <Draggable key={task.taskID} draggableId={task?.taskID} index={index}>
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

  const renderTaskContentModals = () => {
    return (
      <>
        <CreateOrUpdateTask
          open={createModalOpen}
          complexities={complexities}
          onCreateTask={handleCreateTask}
          onOpenCreateTask={handleCreateModalState}
          onClose={handleCloseCreateModalState}
        />
        <CreateOrUpdateTask
          open={updateModalOpen}
          update
          complexities={complexities}
          currentTask={selectedTask}
          onUpdateTask={handleUpdateTask}
          onOpenUpdateTask={handleUpdateModalState}
          onClose={handleCloseUpdateModalState}
        />
        <ViewTaskDetails
          open={viewDetailsModalOpen}
          username={username}
          task={selectedTask}
          onSave={handleUpdateTask}
          onClose={handleCloseViewDetailsModalState}
        />
      </>
    );
  };

  const renderNoTask = () => {
    if (tasks.length === 0) {
      return (
        <NoDataContainer>
          <img src={NoTask} alt={t(LocalizationKey.tasks.noTask)} />
          <Typography variant='h5' fontWeight='bold'>
            {t(LocalizationKey.tasks.errorMessage.error)}
          </Typography>
          <Typography variant='body2' fontWeight='bold'>
            {t(LocalizationKey.tasks.errorMessage.started)}
            <StyledLink
              underline='hover'
              variant='body2'
              fontWeight='bold'
              onClick={() => handleCreateModalState()}
            >
              {t(LocalizationKey.tasks.errorMessage.created)}
            </StyledLink>
          </Typography>
        </NoDataContainer>
      );
    }

    return null;
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <PageContainer>
          <Grid container>
            <Grid item xs={calculateGridSize(Object.values(Status).length)}>
              <Select
                name='teamFilter'
                placeholder='Team Name'
                options={teamOptions}
                onChange={handleTeamFilter}
                value={selectedTeam}
              />
            </Grid>
          </Grid>

          <StyledDivider />

          <TaskGridContainer
            container
            spacing={1}
            justifyContent='space-between'
          >
            {Object.values(Status).map(status => {
              const filteredData = tasks.filter(task => task.status === status);

              return (
                <Grid
                  item
                  container
                  xs={calculateGridSize(Object.values(Status).length)}
                  key={status}
                >
                  <Droppable droppableId={status}>
                    {provided => (
                      <StatusContainer
                        backgroundColor={status}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        {renderStatusContainerHeader(status)}

                        <Divider />

                        {filteredData.map((task, index) => (
                          <Stack key={`${status}_${task.name}_${index}`}>
                            {renderTaskDetailsCards(task, index)}
                          </Stack>
                        ))}
                        {provided.placeholder}
                      </StatusContainer>
                    )}
                  </Droppable>
                </Grid>
              );
            })}
          </TaskGridContainer>

          {renderNoTask()}
        </PageContainer>
      </DragDropContext>

      {renderTaskContentModals()}

      <ErrorMessage error={errorMessage} type='alert' />

      <ConfirmModal
        open={deleteModalOpen}
        onConfirm={handleDeleteTask}
        onClose={handleCloseDeleteModalState}
        message={`${t(LocalizationKey.tasks.taskDetails.deleteConfirm)} ${
          selectedTaskForDelete?.name
        }?`}
      />
    </>
  );
};

export default TasksContent;
