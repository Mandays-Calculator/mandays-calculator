import { AllTasksResponse } from "~/api/tasks/types";

import { ReactElement, useEffect, useState } from "react";

import { styled } from "@mui/material/styles";
import { Divider, Grid, SelectChangeEvent, Stack } from "@mui/material";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

import { Select, PageContainer, ErrorMessage } from "~/components";
import { useTasks } from "~/queries/tasks/Tasks";

import { Status, StatusContainerColor, StatusTitleColor } from "./utils";

import TaskDetailsCard from "./task-details/TaskDetailsCard";
import CreateOrUpdateTask from "./CreateOrUpdateTask";
import EditTask from "./EditTask";
// import MockData from "./MockData.json";

const calculateGridSize = (numStatuses: number): number => {
  return 12 / numStatuses;
};

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
  })
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
  })
);

const TasksContent = (): ReactElement => {
  const { data: tasksData } = useTasks("a0f17dfd-aaa8-11ee-a5cd-a0291936d3a2");
  const [tasks, setTasks] = useState<AllTasksResponse[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (tasksData && tasksData.hasOwnProperty("errorCode")) {
      setErrorMessage("Unable to fetch Data");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    } else if (tasksData && tasksData.data) {
      setTasks(tasksData.data);
    }
  }, [tasksData]);

  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const [viewDetailsModalOpen, setViewDetailsModalOpen] =
    useState<boolean>(false);
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);

  const [selectedTeam, setSelectedTeam] = useState<string | null>("");

  const [selectedTask, setSelectedTask] = useState<AllTasksResponse | null>(
    null
  );

  const handleCreateModalState: () => void = () => {
    setCreateModalOpen(!createModalOpen);
  };

  const handleCloseCreateModalState = () => {
    setCreateModalOpen(false);
  };

  const handleCreateTask = (task: AllTasksResponse | null) => {
    if (task) {
      const updatedMockData = [...tasks, task];
      setTasks(updatedMockData);
    }
  };

  const handleUpdateModalState = (task: AllTasksResponse) => {
    setSelectedTask(task);
    setUpdateModalOpen(!updateModalOpen);
  };
  const handleDelete = (name: string) => {
    const deletedTask = tasks.filter((task) => task.name !== name);
    setTasks(deletedTask);
  };

  const handleCloseUpdateModalState = () => {
    setUpdateModalOpen(false);
  };

  const handleUpdateTask = (updatedTask: AllTasksResponse): void => {
    const updatedMockData = tasks.map((task) => {
      if (task.name === updatedTask.name) {
        return updatedTask;
      }
      return task;
    });
    setTasks(updatedMockData);
  };

  const handleViewDetailsModalState = (task: AllTasksResponse) => {
    setSelectedTask(task);
    setViewDetailsModalOpen(!viewDetailsModalOpen);
  };

  const handleCloseViewDetailsModalState = () => {
    setViewDetailsModalOpen(false);
  };

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    const sourceStatus = source.droppableId;
    const destinationStatus = destination.droppableId;

    const draggedTask = tasks.find((task) => task.name === draggableId);

    if (
      (sourceStatus === Status.Backlog &&
        destinationStatus === Status.OnHold) ||
      (sourceStatus === Status.OnHold && destinationStatus === Status.Backlog)
    ) {
      if (draggedTask) {
        const updatedMockData = tasks.map((task) => {
          if (task.name === draggableId) {
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

  const handleTeamFilter = (e: SelectChangeEvent<unknown>) => {
    setSelectedTeam(e.target.value as string);
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <PageContainer>
          <CreateOrUpdateTask
            open={createModalOpen}
            isCreate={true}
            onClose={handleCloseCreateModalState}
            onCreateTask={handleCreateTask}
            reOpenCreateTask={handleCreateModalState}
          />
          <CreateOrUpdateTask
            open={updateModalOpen}
            isCreate={false}
            task={selectedTask}
            onClose={handleCloseUpdateModalState}
            onCreateTask={handleUpdateTask}
            reOpenCreateTask={handleCreateModalState}
          />
          <EditTask
            open={viewDetailsModalOpen}
            onClose={handleCloseViewDetailsModalState}
            task={selectedTask}
            onSave={handleUpdateTask}
          />

          <Grid container>
            <Grid item xs={calculateGridSize(Object.values(Status).length)}>
              <Select
                name="filter"
                placeholder="Team Name"
                options={[
                  {
                    value: "1",
                    label: "Team 1",
                  },
                  {
                    value: "2",
                    label: "Team 2",
                  },
                ]}
                onChange={(e) => handleTeamFilter(e)}
                value={selectedTeam}
              />
            </Grid>
          </Grid>

          <Divider style={{ margin: "2rem 0 3rem 0" }} />

          <Grid
            container
            spacing={1}
            justifyContent="space-between"
            style={{ maxHeight: "960px", minWidth: "1080px", overflow: "auto" }}
          >
            {Object.values(Status).map((status) => {
              const filteredData = tasks.filter(
                (task) => task.status === status
              );
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
                        <Grid item container alignItems={"center"}>
                          <Grid item xs={11}>
                            <StyledStatusTitle color={status}>
                              {status}
                            </StyledStatusTitle>
                          </Grid>
                          <Grid item xs={1}>
                            <StyledCreateTaskIconButton
                              display={status}
                              onClick={handleCreateModalState}
                            >
                              +
                            </StyledCreateTaskIconButton>
                          </Grid>
                        </Grid>

                        <Divider />
                        {filteredData.map((task, index) => (
                          <Stack key={`${status}_${task.name}_${index}`}>
                            {task.status === Status.Backlog ||
                            task.status === Status.OnHold ? (
                              <Draggable
                                key={task.name}
                                draggableId={task.name}
                                index={index}
                              >
                                {(provided) => (
                                  <Stack
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <TaskDetailsCard
                                      data={task}
                                      handleEdit={handleUpdateModalState}
                                      handleViewDetails={
                                        handleViewDetailsModalState
                                      }
                                      onDelete={() => handleDelete(task.name)}
                                    />
                                  </Stack>
                                )}
                              </Draggable>
                            ) : (
                              <TaskDetailsCard
                                data={task}
                                handleEdit={handleUpdateModalState}
                                handleViewDetails={handleViewDetailsModalState}
                                onDelete={() => handleDelete(task.name)}
                              />
                            )}
                          </Stack>
                        ))}
                        {provided.placeholder}
                      </StatusContainer>
                    )}
                  </Droppable>
                </Grid>
              );
            })}
          </Grid>
        </PageContainer>
      </DragDropContext>
      <ErrorMessage error={errorMessage} type="alert" />
    </>
  );
};

export default TasksContent;
