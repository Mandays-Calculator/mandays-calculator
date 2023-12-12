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
import CreateTask from "./CreateTask";
import EditTask from "./EditTask";

import { AllTasksResponse } from "~/api/tasks/types";

// export interface Task {
//   taskTitle: string;
//   desc: string;
//   date: string;
//   sprint: string;
//   complexity: string;
//   status: string;
//   type: string;
//   functionality: string;
//   comments: {
//     name: string;
//     comment: string;
//   };
// }

const StyleDiv = styled("div")(
  ({ backgroundColor }: { backgroundColor: string }) => ({
    backgroundColor:
      backgroundColor === "Backlog"
        ? "#E3E6E7"
        : backgroundColor === "Not Yet Started"
        ? "#E4F7F9"
        : backgroundColor === "In Progress"
        ? "#FFF4D4"
        : backgroundColor === "On Hold"
        ? "#FFCECE"
        : "#D5FFCD",
    borderRadius: 10,
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
      : "black",
}));

const StyledAdd = styled(Grid)(({ display }: { display: string }) => ({
  fontSize: 25,
  fontWeight: "bolder",
  float: "right",
  cursor: "pointer",
  display: display !== "Backlog" ? "none" : "",
}));

const TasksContent = (): ReactElement => {
  const [modalAddOpen, setAddModalOpen] = useState<boolean>(false);
  const [modalEditOpen, setEditModalOpen] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<AllTasksResponse | null>(
    null
  );

  const status = [
    "Backlog",
    "Not Yet Started",
    "In Progress",
    "On Hold",
    "Completed",
  ];
  const [mockData, setMockData] = useState<AllTasksResponse[]>([
    {
      name: "BE - Database Structure",
      description: "lorem kineme.",
      completion_date: "11/13/2023",
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
      name: "BE - Database Structure 1",
      description: "lorem kineme",
      completion_date: "11/13/2023",
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
      name: "BE - Database Structure 2",
      description: "lorem kineme",
      completion_date: "11/13/2023",
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
      name: "BE - Database Structure 3",
      description: "lorem kineme",
      completion_date: "11/13/2023",
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
      name: "Optimization",
      description: "lorem kineme",
      completion_date: "11/13/2023",
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
      name: "Integration",
      description: "lorem kineme",
      completion_date: "11/13/2023",
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
      name: "Project Management - UI",
      description: "lorem kineme",
      completion_date: "11/13/2023",
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

  const handleAddModalState: () => void = () => {
    setAddModalOpen(!modalAddOpen);
  };

  const handleCloseAddModalState = () => {
    setAddModalOpen(false);
  };
  const handleEditModalState = (task: AllTasksResponse) => {
    setSelectedTask(task);
    setEditModalOpen(!modalEditOpen);
  };

  const handleCloseEditModalState = () => {
    setEditModalOpen(false);
  };

  const handleCreateTask = (task: AllTasksResponse) => {
    const updatedMockData = [...mockData, task];
    setMockData(updatedMockData);
  };
  const handleSaveTask = (updatedTask: AllTasksResponse): void => {
    const updatedMockData = mockData.map((task) => {
      if (task.name === updatedTask.name) {
        return updatedTask; // Update the task in the mockData array
      }
      return task;
    });
    setMockData(updatedMockData);
  };

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    const sourceStatus = source.droppableId;
    const destinationStatus = destination.droppableId;

    const draggedTask = mockData.find((task) => task.name === draggableId);

    // Limit dragging and dropping between Backlog and On Hold
    if (
      (sourceStatus === "Backlog" && destinationStatus === "On Hold") ||
      (sourceStatus === "On Hold" && destinationStatus === "Backlog")
    ) {
      if (draggedTask) {
        const updatedMockData = mockData.map((task) => {
          if (task.name === draggableId) {
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
    <PageContainer>
      <CreateTask
        open={modalAddOpen}
        onClose={handleCloseAddModalState}
        onCreateTask={handleCreateTask}
        reOpenCreateTask={handleAddModalState}
      />
      <EditTask
        open={modalEditOpen}
        onClose={handleCloseEditModalState}
        task={selectedTask}
        onSave={handleSaveTask}
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
      <DragDropContext onDragEnd={handleDragEnd}>
        <Grid container spacing={1} justifyContent="space-between">
          {status.map((i) => {
            const filteredData = mockData.filter((task) => task.status === i);

            return (
              <Grid item xs={2.4} key={i}>
                <Droppable droppableId={i}>
                  {(provided) => (
                    <StyleDiv
                      backgroundColor={i}
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      {...provided.droppableProps}
                    >
                      <Grid container alignItems={"center"}>
                        <StyledTitle item xs={11} color={i}>
                          {i}
                        </StyledTitle>
                        <StyledAdd
                          item
                          xs={1}
                          display={i}
                          onClick={handleAddModalState}
                        >
                          +
                        </StyledAdd>
                      </Grid>

                      <Divider />
                      {filteredData.map((task, index) => (
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
                                handleEdit={handleEditModalState}
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
      </DragDropContext>
    </PageContainer>
  );
};

export default TasksContent;
