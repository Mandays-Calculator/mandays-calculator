import React, { useState } from "react";

import { Grid, Stack, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import { Select, TextField, Modal } from "~/components";
import CustomButton from "~/components/form/button/CustomButton";
import ComplexityDetails from "./complexity-details";
import { AllTasksResponse } from "~/api/tasks";

// interface Task {
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

interface CreateModalProps {
  open: boolean;
  onClose: () => void;
  onCreateTask: (task: AllTasksResponse) => void;
  reOpenCreateTask: () => void;
}

const CreateTask: React.FC<CreateModalProps> = ({
  open,
  onClose,
  onCreateTask,
  reOpenCreateTask,
}) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newTask, setNewTask] = useState<AllTasksResponse>({
    name: "",
    description: "",
    completion_date: "12/16/2023",
    sprint: "2",
    complexity: "",
    status: "Backlog",
    type: "",
    functionality: "",
    comments: [
      {
        name: "Zad Geron",
        comment: "This is a test",
      },
    ],
  });

  const [openComplexity, setOpenComplexity] = useState<boolean>(false);

  const handleCreateTask = (): void => {
    onCreateTask(newTask);
    setNewTask({
      name: "",
      description: "",
      completion_date: "",
      sprint: "",
      complexity: "",
      status: "Backlog",
      type: "",
      functionality: "",
      comments: [
        {
          name: "",
          comment: "",
        },
      ],
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
                name="name"
                label="TaskName"
                onChange={(e) =>
                  setNewTask({ ...newTask, name: e.target.value })
                }
                value={newTask.name}
              />
            </Grid>
          </Grid>

          <TextField
            name="description"
            label="Description"
            fullWidth
            multiline
            rows={4}
            maxRows={4}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
            value={newTask.description}
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
