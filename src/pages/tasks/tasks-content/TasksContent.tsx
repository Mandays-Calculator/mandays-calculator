import { ReactElement, useState } from "react";

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

interface Task {
  taskTitle: string;
  desc: string;
  date: string;
  sprint: string;
  complexity: string;
  status: string;
  type: string;
}

const TasksContent = (): ReactElement => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
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
    },
    {
      taskTitle: "BE - Database Structure 1",
      desc: "lorem kineme",
      date: "11/13/2023",
      sprint: "1",
      complexity: "13",
      status: "Backlog",
      type: "Bug",
    },
    {
      taskTitle: "BE - Database Structure 2",
      desc: "lorem kineme",
      date: "11/13/2023",
      sprint: "1",
      complexity: "13",
      status: "Backlog",
      type: "Bug",
    },
    {
      taskTitle: "BE - Database Structure 3",
      desc: "lorem kineme",
      date: "11/13/2023",
      sprint: "1",
      complexity: "13",
      status: "Not Yet Started",
      type: "Bug",
    },
    {
      taskTitle: "Optimization",
      desc: "lorem kineme",
      date: "11/13/2023",
      sprint: "1",
      complexity: "13",
      status: "In Progress",
      type: "Bug",
    },
    {
      taskTitle: "Integration",
      desc: "lorem kineme",
      date: "11/13/2023",
      sprint: "1",
      complexity: "13",
      status: "On Hold",
      type: "Bug",
    },
    {
      taskTitle: "Project Management - UI",
      desc: "lorem kineme",
      date: "11/13/2023",
      sprint: "1",
      complexity: "13",
      status: "Completed",
      type: "Bug",
    },
  ]);

  const handleModalState: () => void = () => {
    setModalOpen(!modalOpen);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleCreateTask = (task: Task) => {
    const updatedMockData = [...mockData, task];
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
          open={modalOpen}
          onClose={handleCloseModal}
          onCreateTask={handleCreateTask}
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
        <Divider sx={{ mb: 7 }} style={{ marginTop: 20 }} />

        <Grid container spacing={1} justifyContent="space-evenly">
          {status.map((i) => {
            const filteredData = mockData.filter((task) => task.status === i);

            return (
              <Grid item xs={2.4} key={i}>
                <Droppable droppableId={i}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      style={{
                        backgroundColor:
                          i === "Backlog"
                            ? "#E3E6E7"
                            : i === "Not Yet Started"
                            ? "#E4F7F9"
                            : i === "In Progress"
                            ? "#FFF4D4"
                            : i === "On Hold"
                            ? "#FFCECE"
                            : "#D5FFCD",
                        borderRadius: 10,
                        padding: 5,
                      }}
                      {...provided.droppableProps}
                    >
                      <Grid container spacing={0}>
                        <Grid
                          item
                          xs={8}
                          style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            color:
                              i === "Not Yet Started"
                                ? "#2C8ED1"
                                : i === "In Progress"
                                ? "#796101"
                                : i === "On Hold"
                                ? "#D54147"
                                : i === "Completed"
                                ? "#177006"
                                : "black",
                          }}
                        >
                          {i}
                        </Grid>
                        <Grid item xs={4}>
                          <div
                            style={{
                              fontSize: 25,
                              fontWeight: "bolder",
                              float: "right",
                              cursor: "pointer",
                              display: i !== "Backlog" ? "none" : "",
                            }}
                            onClick={handleModalState}
                          >
                            +
                          </div>
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
                              <TaskDetailsCard data={task} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
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
