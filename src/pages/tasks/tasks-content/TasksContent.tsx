import { ReactElement, useEffect, useState } from "react";

import { styled } from "@mui/material/styles";
import { Divider, Grid, SelectChangeEvent } from "@mui/material";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

import { Select, PageContainer } from "~/components";

import TaskDetailsCard from "./task-details/TaskDetailsCard";
import CreateOrUpdateTask from "./CreateOrUpdateTask";

import EditTask from "./EditTask";

import { AllTasksResponse } from "~/api/tasks/types";
import { useTasks } from "~/queries/tasks/Tasks";

enum Status {
  Backlog = "Backlog",
  NotYetStarted = "Not Yet Started",
  InProgress = "In Progress",
  OnHold = "On Hold",
  Completed = "Completed",
}

enum StatusContainerColor {
  Backlog = "#E3E6E7",
  NotYetStarted = "#E4F7F9",
  InProgress = "#FFF4D4",
  OnHold = "#FFCECE",
  Completed = "#D5FFCD",
}

enum StatusTitleColor {
  Backlog = "#000000",
  NotYetStarted = "#2C8ED1",
  InProgress = "#796101",
  OnHold = "#D54147",
  Completed = "#177006",
}

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
  const { data: tasksData } = useTasks("DEV");
  // const { data: tasksData } = { data: { data: MockData } };
  const [tasks, setTasks] = useState<AllTasksResponse[]>([]);

  useEffect(() => {
    if (tasksData) {
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

  // UPDATE TASK
  const handleUpdateModalState = (task: AllTasksResponse) => {
    setSelectedTask(task);
    setUpdateModalOpen(!updateModalOpen);
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

  // VIEW TASK
  const handleViewDetailsModalState = (task: AllTasksResponse) => {
    setSelectedTask(task);
    setViewDetailsModalOpen(!viewDetailsModalOpen);
  };

  const handleCloseViewDetailsModalState = () => {
    setViewDetailsModalOpen(false);
  };

  // DRAG N DROP
  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    const sourceStatus = source.droppableId;
    const destinationStatus = destination.droppableId;

    const draggedTask = tasks.find((task) => task.name === draggableId);

    // Limit dragging and dropping between Backlog and On Hold
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

        <div
          style={{ maxHeight: "960px", minWidth: "1080px", overflow: "auto" }}
        >
          <Grid container spacing={1} justifyContent="space-between">
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
                          <div>
                            {task.status === Status.Backlog ||
                            task.status === Status.OnHold ? (
                              <Draggable
                                key={task.name}
                                draggableId={task.name}
                                index={index}
                              >
                                {(provided) => (
                                  <div
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
                                    />
                                  </div>
                                )}
                              </Draggable>
                            ) : (
                              <TaskDetailsCard
                                data={task}
                                handleEdit={handleUpdateModalState}
                                handleViewDetails={handleViewDetailsModalState}
                              />
                            )}
                          </div>
                        ))}
                        {provided.placeholder}
                      </StatusContainer>
                    )}
                  </Droppable>
                </Grid>
              );
            })}
          </Grid>
        </div>
      </PageContainer>
    </DragDropContext>
  );
};

export default TasksContent;
