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

import MockData from "./mockData.json";

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
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const status = [
    "Backlog",
    "Not Yet Started",
    "In Progress",
    "On Hold",
    "Completed",
  ];
  const [mockData, setMockData] = useState<Task[]>(MockData);

  const handleAddModalState: () => void = () => {
    setAddModalOpen(!modalAddOpen);
  };

  const handleCloseAddModalState = () => {
    setAddModalOpen(false);
  };
  const handleEditModalState = (task: Task) => {
    setSelectedTask(task);
    setEditModalOpen(!modalEditOpen);
  };

  const handleCloseEditModalState = () => {
    setEditModalOpen(false);
  };

  const handleCreateTask = (task: Task) => {
    const updatedMockData = [...mockData, task];
    setMockData(updatedMockData);
  };
  const handleSaveTask = (updatedTask: Task): void => {
    const updatedMockData = mockData.map((task) => {
      if (task.taskTitle === updatedTask.taskTitle) {
        return updatedTask;
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
                                    handleEdit={handleEditModalState}
                                  />
                                </div>
                              )}
                            </Draggable>
                          ) : (
                            <TaskDetailsCard
                              data={task}
                              handleEdit={handleEditModalState}
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
      </PageContainer>
    </DragDropContext>
  );
};

export default TasksContent;
