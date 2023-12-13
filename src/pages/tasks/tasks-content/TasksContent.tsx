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
  NotStarted = "Not Yet Started",
  InProgress = "In Progress",
  OnHold = "On Hold",
  Completed = "Completed",
}

const calculateGridSize = (numStatuses: number): number => {
  return 12 / numStatuses;
};

const StyleDiv = styled("div")(
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
  const { data: tasksData } = useTasks("DEV");
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

  // const [modalAddOpen, setAddModalOpen] = useState<boolean>(false);
  // const [modalEditOpen, setEditModalOpen] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<AllTasksResponse | null>(
    null
  );

  // const status = [
  //   "Backlog",
  //   "Not Yet Started",
  //   "In Progress",
  //   "On Hold",
  //   "Completed",
  // ];

  // const [tasks, setTasks] = useState<AllTasksResponse[]>([
  //   {
  //     name: "BE - Database Structure",
  //     description: "lorem kineme.",
  //     completion_date: "11/13/2023",
  //     sprint: "1",
  //     complexity: "13",
  //     status: "Backlog",
  //     type: "Bug",
  //     functionality: [
  //       {
  //         id: "2413054d-9945-11ee-a2d5-244bfee2440b",
  //         name: "Simple Function",
  //       },
  //     ],
  //     comments: [
  //       {
  //         name: "Zad Geron",
  //         comment: "This is a test",
  //       },
  //     ],
  //   },
  //   {
  //     name: "BE - Database Structure 1",
  //     description: "lorem kineme",
  //     completion_date: "11/13/2023",
  //     sprint: "1",
  //     complexity: "13",
  //     status: "Backlog",
  //     type: "Bug",
  //     functionality: [
  //       {
  //         id: "2413054d-9945-11ee-a2d5-244bfee2440b",
  //         name: "Simple Function",
  //       },
  //     ],
  //     comments: [
  //       {
  //         name: "Zad Geron",
  //         comment: "This is a test",
  //       },
  //     ],
  //   },
  //   {
  //     name: "BE - Database Structure 2",
  //     description: "lorem kineme",
  //     completion_date: "11/13/2023",
  //     sprint: "1",
  //     complexity: "13",
  //     status: "Backlog",
  //     type: "Bug",
  //     functionality: [
  //       {
  //         id: "2413054d-9945-11ee-a2d5-244bfee2440b",
  //         name: "Simple Function",
  //       },
  //     ],
  //     comments: [
  //       {
  //         name: "Zad Geron",
  //         comment: "This is a test",
  //       },
  //     ],
  //   },
  //   {
  //     name: "BE - Database Structure 3",
  //     description: "lorem kineme",
  //     completion_date: "11/13/2023",
  //     sprint: "1",
  //     complexity: "13",
  //     status: "Not Yet Started",
  //     type: "Bug",
  //     functionality: [
  //       {
  //         id: "2413054d-9945-11ee-a2d5-244bfee2440b",
  //         name: "Simple Function",
  //       },
  //     ],
  //     comments: [
  //       {
  //         name: "Zad Geron",
  //         comment: "This is a test",
  //       },
  //     ],
  //   },
  //   {
  //     name: "Optimization",
  //     description: "lorem kineme",
  //     completion_date: "11/13/2023",
  //     sprint: "1",
  //     complexity: "13",
  //     status: "In Progress",
  //     type: "Bug",
  //     functionality: [
  //       {
  //         id: "2413054d-9945-11ee-a2d5-244bfee2440b",
  //         name: "Simple Function",
  //       },
  //     ],
  //     comments: [
  //       {
  //         name: "Zad Geron",
  //         comment: "This is a test",
  //       },
  //     ],
  //   },
  //   {
  //     name: "Integration",
  //     description: "lorem kineme",
  //     completion_date: "11/13/2023",
  //     sprint: "1",
  //     complexity: "13",
  //     status: "On Hold",
  //     type: "Bug",
  //     functionality: [
  //       {
  //         id: "2413054d-9945-11ee-a2d5-244bfee2440b",
  //         name: "Simple Function",
  //       },
  //     ],
  //     comments: [
  //       {
  //         name: "Zad Geron",
  //         comment: "This is a test",
  //       },
  //     ],
  //   },
  //   {
  //     name: "Project Management - UI",
  //     description: "lorem kineme",
  //     completion_date: "11/13/2023",
  //     sprint: "1",
  //     complexity: "13",
  //     status: "Completed",
  //     type: "Bug",
  //     functionality: [
  //       {
  //         id: "2413054d-9945-11ee-a2d5-244bfee2440b",
  //         name: "Simple Function",
  //       },
  //     ],
  //     comments: [
  //       {
  //         name: "Zad Geron",
  //         comment: "This is a test",
  //       },
  //     ],
  //   },
  // ]);

  // CREATE TASK
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
      (sourceStatus === "Backlog" && destinationStatus === "On Hold") ||
      (sourceStatus === "On Hold" && destinationStatus === "Backlog")
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
                      <StyleDiv
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
                      </StyleDiv>
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
