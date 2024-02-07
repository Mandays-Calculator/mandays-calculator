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
import SimpleBarReact from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import LocalizationKey from "~/i18n/key";
import {
  SelectChangeEvent,
  Typography,
  IconButton,
  Divider,
  Stack,
  Grid,
  Link,
} from "@mui/material";

import { Select, PageContainer } from "~/components";
import { useCommonOption } from "~/queries/common/options";
import { useDeleteTask, useTasks } from "~/queries/tasks/Tasks";
import { ConfirmModal } from "~/components";
import { useUserAuth } from "~/hooks/user";

import { Status, StatusContainerColor, StatusTitleColor } from "./utils";
import TaskDetailsCard from "./task-details/TaskDetailsCard";
import CreateOrUpdateTask from "./CreateOrUpdateTask";
import ViewTaskDetails from "./ViewTaskDetails";

import NoTask from "~/assets/img/empty_tasks.png";

import { taskContentStyles } from "./style";

const StatusContainer = styled("div")(
  ({ backgroundColor }: { backgroundColor: string }) => ({
    backgroundColor:
      backgroundColor === Status.Backlog
        ? StatusContainerColor.Backlog
        : backgroundColor === Status.NotYetStarted
        ? StatusContainerColor.NotYetStarted
        : backgroundColor === Status.InProgress
        ? StatusContainerColor.InProgress
        : backgroundColor === Status.OnHold
        ? StatusContainerColor.OnHold
        : StatusContainerColor.Completed,
    borderRadius: 10,
    width: "100%",
    padding: 15,
  }),
);

const StyledStatusTitle = styled(Grid)(({ color }: { color: string }) => ({
  fontSize: 18,
  margin: color !== Status.Backlog ? "0.3em 0" : 0,
  fontWeight: "bold",
  color:
    color === Status.NotYetStarted
      ? StatusTitleColor.NotYetStarted
      : color === Status.InProgress
      ? StatusTitleColor.InProgress
      : color === Status.OnHold
      ? StatusTitleColor.OnHold
      : color === Status.Completed
      ? StatusTitleColor.Completed
      : StatusTitleColor.Backlog,
}));

const StyledCreateTaskIconButton = styled(Grid)(
  ({ display }: { display: string }) => ({
    fontSize: 25,
    fontWeight: "bolder",
    float: "right",
    cursor: "pointer",
    display: display !== Status.Backlog ? "none" : "",
  }),
);

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

  const statuses = ["1", "2", "3", "4", "5"];

  const statusData = statuses.map((status) => {
    const { data, isSuccess } = useTasks(
      "a2eb9f01-6e4e-11ee-8624-a0291936d1c2",
      status,
      "10",
      "100",
      "1",
    );

    return { data, isSuccess };
  });

  const [
    { data: backlog, isSuccess: isSuccessBacklog },
    { data: notYetStarted, isSuccess: isSuccessNys },
    { data: inProgress, isSuccess: isSuccessIp },
    { data: onHold, isSuccess: isSuccessOnHold },
    { data: completed, isSuccess: isSuccessCompleted },
  ] = statusData;

  const deleteMutation = useDeleteTask();

  const username = `${user?.firstName} ${user?.lastName}`;
  const complexities = useCommonOption("complexity");
  // const [errorMessage, setErrorMessage] = useState<string>("");

  const [selectedTeam, setSelectedTeam] = useState<string | null>("");
  const [selectedTask, setSelectedTask] = useState<AllTasksResponse | null>();
  const [selectedTaskForDelete, setSelectedTaskForDelete] = useState<string>();

  const [viewDetailsModalOpen, setViewDetailsModalOpen] =
    useState<boolean>(false);
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      if (
        isSuccessBacklog &&
        isSuccessNys &&
        isSuccessIp &&
        isSuccessOnHold &&
        isSuccessCompleted
      ) {
        const allData = [
          ...backlog,
          ...notYetStarted,
          ...inProgress,
          ...onHold,
          ...completed,
        ];
        setTasks(allData);
      }
    }, 1000);
  }, [backlog, notYetStarted, inProgress, onHold, completed]);

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

    const draggedTask = tasks.find((task) => task.id === draggableId);

    if (
      (sourceStatus === Status.Backlog &&
        destinationStatus === Status.OnHold) ||
      (sourceStatus === Status.OnHold && destinationStatus === Status.Backlog)
    ) {
      if (draggedTask) {
        const updatedMockData = tasks.map((task) => {
          if (task.id === draggableId) {
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
    console.log("getEditValue", task);
  };

  const handleDeleteModalState = (id: string) => {
    setSelectedTaskForDelete(id);
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
  const handleCreateTask = (newTask: AllTasksResponse) => {
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
    const updatedData = tasks.map((task) => {
      if (task.taskID === updatedTask.taskID) {
        return updatedTask;
      }

      return task;
    });

    setTasks(updatedData);
  };

  const handleDeleteTask = () => {
    if (selectedTaskForDelete) {
      const updatedTasks = tasks.filter(
        (task) => task.taskID !== selectedTaskForDelete,
      );
      setTasks(updatedTasks);

      deleteMutation.mutate(
        { id: selectedTaskForDelete },
        {
          onSuccess: () => {
            console.log("Item deleted successfully!");
          },
          onError: (error) => {
            console.log(error);

            setTasks(tasks);
          },
        },
      );

      setDeleteModalOpen(false);
      setTasks(tasks);
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
            <IconButton onClick={handleCreateModalState}>
              <AddIcon />
            </IconButton>
          </StyledCreateTaskIconButton>
        </Grid>
      </Grid>
    );
  };

  const renderTaskDetailsCards = (task: AllTasksResponse, index: number) => {
    if (task.status === Status.Backlog || task.status === Status.OnHold) {
      return (
        <Draggable key={task?.id} draggableId={`${task?.id}`} index={index}>
          {(provided) => (
            <Stack
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <TaskDetailsCard
                data={task}
                handleViewDetails={handleViewDetailsModalState}
                handleEdit={handleUpdateModalState}
                onDelete={() => {
                  console.log("delete", task);
                  handleDeleteModalState(task.id as string);
                }}
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
          onDelete={() => handleDeleteModalState(task.id as string)}
        />
      );
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
          task={selectedTask as AllTasksResponse}
          onSave={handleUpdateTask}
          onClose={handleCloseViewDetailsModalState}
        />
      </>
    );
  };

  const renderNoTask = () => {
    if (tasks?.length === 0) {
      return (
        <Stack sx={taskContentStyles.noData}>
          <img src={NoTask} alt="error" />
          <Typography variant="h5" fontWeight="bold">
            {t(LocalizationKey.tasks.errorMessage.error)}
          </Typography>
          <Typography variant="body2" fontWeight="bold">
            {t(LocalizationKey.tasks.errorMessage.started)}
            <Link
              underline="hover"
              variant="body2"
              fontWeight="bold"
              onClick={handleCreateModalState}
              sx={taskContentStyles.link}
            >
              {t(LocalizationKey.tasks.errorMessage.created)}
            </Link>
          </Typography>
        </Stack>
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
                name="teamFilter"
                placeholder="Team Name"
                options={teamOptions}
                onChange={handleTeamFilter}
                value={selectedTeam}
              />
            </Grid>
          </Grid>

          <Divider sx={taskContentStyles.divider} />

          <Grid
            container
            spacing={1}
            justifyContent="space-between"
            sx={taskContentStyles.taskGridContainer}
          >
            {Object.values(Status).map((status) => {
              const filteredData = tasks
                ?.filter((task) => task.status === status)
                .map((task) => {
                  if (
                    task.createdDate &&
                    !isNaN(new Date(task.createdDate).getTime())
                  ) {
                    const createdDate = new Date(task.createdDate);
                    const formattedCreatedDate = `${createdDate
                      .getFullYear()
                      .toString()
                      .padStart(4, "0")}-${(createdDate.getMonth() + 1)
                      .toString()
                      .padStart(2, "0")}-${createdDate
                      .getDate()
                      .toString()
                      .padStart(2, "0")}`;
                    task.createdDate = formattedCreatedDate;
                  }

                  if (
                    task.completionDate &&
                    !isNaN(new Date(task.completionDate).getTime())
                  ) {
                    const completionDate = new Date(task.completionDate);
                    const formattedCompletionDate = `${completionDate
                      .getFullYear()
                      .toString()
                      .padStart(4, "0")}-${(completionDate.getMonth() + 1)
                      .toString()
                      .padStart(2, "0")}-${completionDate
                      .getDate()
                      .toString()
                      .padStart(2, "0")}`;
                    task.completionDate = formattedCompletionDate;
                  }

                  return task;
                });

              return (
                <Grid
                  item
                  container
                  xs={calculateGridSize(Object.values(Status).length)}
                  key={status}
                >
                  <Droppable droppableId={status}>
                    {(provided) => (
                      <StatusContainer
                        backgroundColor={status}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        {renderStatusContainerHeader(status)}

                        <Divider />

                        <SimpleBarReact style={{ maxHeight: "410px" }}>
                          {filteredData.map((task, index) => (
                            <div key={`${status}_${task.id}_${index}`}>
                              {renderTaskDetailsCards(task, index)}
                            </div>
                          ))}
                        </SimpleBarReact>

                        {provided.placeholder}
                      </StatusContainer>
                    )}
                  </Droppable>
                </Grid>
              );
            })}
          </Grid>

          {renderNoTask()}
        </PageContainer>
      </DragDropContext>

      {renderTaskContentModals()}

      <ConfirmModal
        open={deleteModalOpen}
        onConfirm={() => handleDeleteTask()}
        onClose={handleCloseDeleteModalState}
        message={`${t(LocalizationKey.tasks.taskDetails.deleteConfirm)}
         ${selectedTask?.name}
        ?`}
      />
    </>
  );
};

export default TasksContent;
