import React, { useState } from "react";

import { Grid, Stack, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import { Select, TextField, Modal } from "~/components";
import CustomButton from "~/components/form/button/CustomButton";
import ComplexityDetails from "./complexity-details";

interface Task {
  taskTitle: string;
  desc: string;
  date: string;
  sprint: string;
  complexity: string;
  status: string;
  type: string;
  functionality: string;
}

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onCreateTask: (task: Task) => void;
  reOpenCreateTask: () => void;
}

const CreateTask: React.FC<ModalProps> = ({
  open,
  onClose,
  onCreateTask,
  reOpenCreateTask,
}) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newTask, setNewTask] = useState<Task>({
    taskTitle: "",
    desc: "",
    date: "",
    sprint: "",
    complexity: "",
    status: "Backlog",
    type: "",
    functionality: "",
  });
  const [openComplexity, setOpenComplexity] = useState<boolean>(false);

  const handleCreateTask = (): void => {
    onCreateTask(newTask);
    setNewTask({
      taskTitle: "",
      desc: "",
      date: "",
      sprint: "",
      complexity: "",
      status: "Backlog",
      type: "",
      functionality: "",
    });
    setSelectedTags([]);
    onClose();
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleOpenComplexity = (): void => {
    setOpenComplexity(!openComplexity);
    onClose();
  };

  return (
    <>
      <Modal open={open} title="" maxWidth="md" onClose={onClose}>
        <Stack gap={2}>
          <Grid container>
            <Grid item xs={6}>
              <TextField
                name="taskTitle"
                label="TaskName"
                onChange={(e) =>
                  setNewTask({ ...newTask, taskTitle: e.target.value })
                }
                value={newTask.taskTitle}
              />
            </Grid>
          </Grid>

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
              <Stack gap={1}>
                <Typography>Functionality</Typography>
                <Select
                  name="functionality"
                  placeholder="Select Text"
                  fullWidth
                  onChange={(e) =>
                    handleSelectChange(
                      "functionality",
                      e.target.value as string
                    )
                  }
                  value={newTask.functionality}
                  options={[
                    { value: "sample1", label: "Sample 1" },
                    { value: "sample2", label: "Sample 2" },
                  ]}
                />
              </Stack>
            </Grid>

            <Grid item xs={6}>
              <Stack gap={1}>
                <Stack
                  direction="row"
                  spacing={1}
                  onClick={() => handleOpenComplexity()}
                  style={{ cursor: "pointer" }}
                >
                  <Typography>Complexity</Typography>
                  <InfoOutlinedIcon fontSize="small" />
                </Stack>

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

            <Grid item xs={6}>
              <Stack gap={1}>
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
              </Stack>
            </Grid>
          </Grid>

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

      <ComplexityDetails
        open={openComplexity}
        onClose={() => setOpenComplexity(!openComplexity)}
        openCreateTask={() => reOpenCreateTask()}
      />
    </>
  );
};

export default CreateTask;
