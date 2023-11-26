import { ReactElement, useState } from "react";

import { Divider, Grid, Stack, Typography } from "@mui/material";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd"; // Import these components

import { Select, TextField, PageContainer, Modal } from "~/components";
import CustomButton from "~/components/form/button/CustomButton";

import TaskDetailsCard from "./task-details/TaskDetailsCard";

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
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newTask, setNewTask] = useState<Task>({
    taskTitle: "",
    desc: "",
    date: "",
    sprint: "",
    complexity: "",
    status: "Backlog",
    type: "",
  });

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
      desc: "lorem kineme",
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

  const close = () => {
    setModalOpen(false);
    setNewTask({
      taskTitle: "",
      desc: "",
      date: "",
      sprint: "",
      complexity: "",
      status: "",
      type: "",
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleCreateTask = () => {
    {
      const updatedMockData = [...mockData, newTask];
      setMockData(updatedMockData);

      setModalOpen(false);
      setNewTask({
        taskTitle: "",
        desc: "",
        date: "",
        sprint: "",
        complexity: "",
        status: "Backlog",
        type: "",
      });
    }
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
        <Modal open={modalOpen} title="Task Name" maxWidth="md" onClose={close}>
          <Stack direction="column" gap={2}>
            <TextField
              name="desc"
              label="Description"
              fullWidth
              multiline
              rows={4}
              maxRows={4}
              onChange={(e) => setNewTask({ ...newTask, desc: e.target.value })}
              value={newTask.desc}
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  name="function"
                  label="Function"
                  fullWidth
                  onChange={(e) =>
                    setNewTask({ ...newTask, taskTitle: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <Stack direction="column" gap={1}>
                  <Typography>Complexity</Typography>
                  <Select
                    name="complexity"
                    placeholder="Complexity"
                    defaultValue="simple"
                    fullWidth
                    onChange={(e) =>
                      handleSelectChange("complexity", e.target.value as string)
                    }
                    value={newTask.complexity}
                    options={[
                      {
                        value: "simple",
                        label: "Simple",
                      },
                      {
                        value: "normal",
                        label: "Normal",
                      },
                    ]}
                  />
                </Stack>
              </Grid>
            </Grid>

            <Stack direction="column" gap={1}>
              <Typography>Tags</Typography>
              <Select
                name="tags"
                placeholder="Tags"
                multiple={true}
                fullWidth
                onChange={(e) => setSelectedTags(e.target.value as string[])}
                value={selectedTags}
                options={[
                  { value: "sample1", label: "Sample 1" },
                  { value: "sample2", label: "Sample 2" },
                ]}
              />
              ;
            </Stack>
            <Stack
              direction="row"
              display="flex"
              justifyContent="flex-end"
              gap={1}
            >
              <CustomButton
                type="button"
                colorVariant="primary"
                onClick={handleCreateTask}
              >
                Create
              </CustomButton>
            </Stack>
          </Stack>
        </Modal>
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
        <Grid container spacing={0} justifyContent="space-between">
          {status.map((i) => {
            const filteredData = mockData.filter((task) => task.status === i);

            return (
              <Grid item xs={2} key={i}>
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
                        padding: 20,
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
