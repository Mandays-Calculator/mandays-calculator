import { ReactElement, useState } from "react";

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
import MockData from "./mockData.json";
import EditTask from "./EditTask";
import { Task } from "./type";

enum Status {
  Backlog = "Backlog",
  NotStarted = "Not Yet Started",
  InProgress = "In Progress",
  OnHold = "On Hold",
  Completed = "Completed",
}

const calculateGridSize = (numStatuses: number): number => {
  return 12 / numStatuses;
};

const StatusDiv = styled("div")(
  ({ backgroundColor }: { backgroundColor: string }) => ({
    backgroundColor:
      backgroundColor === Status.Backlog
        ? "#E3E6E7"
        : backgroundColor === Status.NotStarted
        ? "#E4F7F9"
        : backgroundColor === Status.InProgress
        ? "#FFF4D4"
        : backgroundColor === Status.OnHold
        ? "#FFCECE"
        : "#D5FFCD",
    borderRadius: 10,
    width: "100%",
    padding: 15,
  })
);

const StyledTitle = styled(Grid)(({ color }: { color: string }) => ({
  fontSize: 18,
  fontWeight: "bold",
  color:
    color === "Not Yet Started"
      ? "#2C8ED1"
      : color === "In Progress"
      ? "#796101"
      : color === "On Hold"
      ? "#D54147"
      : color === "Completed"
      ? "#177006"
      : "#000000",
}));

const StyledAdd = styled(Grid)(({ display }: { display: string }) => ({
  fontSize: 25,
  fontWeight: "bolder",
  float: "right",
  cursor: "pointer",
  display: display !== "Backlog" ? "none" : "",
}));

const TasksContent = (): ReactElement => {
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const [viewDetailsModalOpen, setViewDetailsModalOpen] =
    useState<boolean>(false);
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<string | null>("");

  const [mockData, setMockData] = useState<Task[]>(MockData);

  // CREATE TASK
  const handleCreateModalState: () => void = () => {
    setCreateModalOpen(!createModalOpen);
  };

  const handleCloseCreateModalState = () => {
    setCreateModalOpen(false);
  };

  const handleCreateTask = (task: Task | null) => {
    if (task) {
      const updatedMockData = [...mockData, task];
      setMockData(updatedMockData);
    }
  };

  // UPDATE TASK
  const handleUpdateModalState = (task: Task) => {
    setSelectedTask(task);
    setUpdateModalOpen(!updateModalOpen);
  };

  const handleCloseUpdateModalState = () => {
    setUpdateModalOpen(false);
  };

  const handleUpdateTask = (updatedTask: Task): void => {
    const updatedMockData = mockData.map((task) => {
      if (task.taskID === updatedTask.taskID) {
        return updatedTask;
      }
      return task;
    });
    setMockData(updatedMockData);
  };

  // VIEW TASK
  const handleViewDetailsModalState = (task: Task) => {
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

    const draggedTask = mockData.find((task) => task.taskTitle === draggableId);

    if (
      (sourceStatus === "Backlog" && destinationStatus === "On Hold") ||
      (sourceStatus === "On Hold" && destinationStatus === "Backlog")
    ) {
      if (draggedTask) {
        const updatedMockData = mockData.map((task) => {
          if (task.taskTitle === draggableId) {
            return {
              ...task,
              status: destinationStatus,
            };
          }
          return task;
        });

        setMockData(updatedMockData);
      }
    }
  };

  const handleChange = (e: SelectChangeEvent<unknown>) => {
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
              onChange={(e) => handleChange(e)}
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
              const filteredData = mockData.filter(
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
                      <StatusDiv
                        backgroundColor={status}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        <Grid item container alignItems={"center"}>
                          <Grid item xs={11}>
                            <StyledTitle color={status}>{status}</StyledTitle>
                          </Grid>
                          <Grid item xs={1}>
                            <StyledAdd
                              display={status}
                              onClick={handleCreateModalState}
                            >
                              +
                            </StyledAdd>
                          </Grid>
                        </Grid>

                        <Divider />
                        {filteredData.map((task, index) => (
                          <div>
                            {task.status === "Backlog" ||
                            task.status === "On Hold" ? (
                              <Draggable
                                key={task.taskTitle}
                                draggableId={task.taskTitle}
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
                      </StatusDiv>
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
