import { ReactElement, useState } from "react";

import { styled } from "@mui/material/styles";
import { Divider, Grid } from "@mui/material";
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

export interface Task {
  taskTitle: string;
  desc: string;
  date: string;
  sprint: string;
  complexity: string;
  status: string;
  type: string;
  functionality: string;
  comments: {
    name: string;
    comment: string;
  }[];
}

const StyleDiv = styled("div")(
  ({ backgroundColor }: { backgroundColor: string }) => ({
    backgroundColor:
      backgroundColor === "Backlog" ? "#E3E6E7"
        : backgroundColor === "Not Yet Started" ? "#E4F7F9"
          : backgroundColor === "In Progress" ? "#FFF4D4"
            : backgroundColor === "On Hold" ? "#FFCECE"
              : "#D5FFCD",
    borderRadius: 10,
    padding: 15,
  })
);

const StyledTitle = styled(Grid)(({ color }: { color: string }) => ({
  fontSize: 18,
  fontWeight: "bold",
  color:
    color === "Not Yet Started" ? "#2C8ED1"
      : color === "In Progress" ? "#796101"
        : color === "On Hold" ? "#D54147"
          : color === "Completed" ? "#177006"
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
  const [viewDetailsModalOpen, setViewDetailsModalOpen] = useState<boolean>(false);
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const status = [
    "Backlog",
    "Not Yet Started",
    "In Progress",
    "On Hold",
    "Completed",
  ];

  const [mockData, setMockData] = useState<Task[]>([
    {
      taskTitle: "BE - Database Structure",
      desc: "lorem kineme.",
      date: "11/13/2023",
      sprint: "1",
      complexity: "13",
      status: "Backlog",
      type: "Bug",
      functionality: "",
      comments: [
        {
          name: "Zad Geron",
          comment: "This is a test",
        },
      ],
    },
    {
      taskTitle: "BE - Database Structure 1",
      desc: "lorem kineme",
      date: "11/13/2023",
      sprint: "1",
      complexity: "13",
      status: "Backlog",
      type: "Bug",
      functionality: "",
      comments: [
        {
          name: "Zad Geron",
          comment: "This is a test",
        },
      ],
    },
    {
      taskTitle: "BE - Database Structure 2",
      desc: "lorem kineme",
      date: "11/13/2023",
      sprint: "1",
      complexity: "13",
      status: "Backlog",
      type: "Bug",
      functionality: "",
      comments: [
        {
          name: "Zad Geron",
          comment: "This is a test",
        },
      ],
    },
    {
      taskTitle: "BE - Database Structure 3",
      desc: "lorem kineme",
      date: "11/13/2023",
      sprint: "1",
      complexity: "13",
      status: "Not Yet Started",
      type: "Bug",
      functionality: "",
      comments: [
        {
          name: "Zad Geron",
          comment: "This is a test",
        },
      ],
    },
    {
      taskTitle: "Optimization",
      desc: "lorem kineme",
      date: "11/13/2023",
      sprint: "1",
      complexity: "13",
      status: "In Progress",
      type: "Bug",
      functionality: "",
      comments: [
        {
          name: "Zad Geron",
          comment: "This is a test",
        },
      ],
    },
    {
      taskTitle: "Integration",
      desc: "lorem kineme",
      date: "11/13/2023",
      sprint: "1",
      complexity: "13",
      status: "On Hold",
      type: "Bug",
      functionality: "",
      comments: [
        {
          name: "Zad Geron",
          comment: "This is a test",
        },
      ],
    },
    {
      taskTitle: "Project Management - UI",
      desc: "lorem kineme",
      date: "11/13/2023",
      sprint: "1",
      complexity: "13",
      status: "Completed",
      type: "Bug",
      functionality: "",
      comments: [
        {
          name: "Zad Geron",
          comment: "This is a test",
        },
      ],
    },
  ]);

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
      if (task.taskTitle === updatedTask.taskTitle) {
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
        <Select
          name="filter"
          placeholder="Team Name"
          style={{ width: 200 }}
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
        />

        <Divider style={{ margin: "2rem 0 3rem 0" }} />

        <div style={{ maxHeight: '960px', minWidth: '960px', overflow: 'auto' }}>
          <Grid container spacing={1} justifyContent="space-between">
            {status.map((i) => {
              const filteredData = mockData.filter((task) => task.status === i);

              return (
                <Grid item container xs={2.4} key={i}>
                  <Droppable droppableId={i}>
                    {(provided) => (
                      <StyleDiv
                        backgroundColor={i}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        {...provided.droppableProps}
                      >
                        <Grid item container alignItems={"center"}>
                          <Grid item xs={11}>
                            <StyledTitle color={i}>
                              {i}
                            </StyledTitle>
                          </Grid>
                          <Grid item xs={1}>
                            <StyledAdd display={i} onClick={handleCreateModalState}>
                              +
                            </StyledAdd>
                          </Grid>
                        </Grid>

                        <Divider />

                        {filteredData.map((task, index) => (
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
                                  handleViewDetails={handleViewDetailsModalState}
                                />
                              </div>
                            )}
                          </Draggable>
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
