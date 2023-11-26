import React, { useState } from "react";

import { Grid, Stack, Typography } from "@mui/material";

import { Select, TextField, Modal } from "~/components";
import CustomButton from "~/components/form/button/CustomButton";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onCreateTask: (task: any) => void;
}

const CreateTask: React.FC<ModalProps> = ({ open, onClose, onCreateTask }) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newTask, setNewTask] = useState({
    taskTitle: "",
    desc: "",
    date: "",
    sprint: "",
    complexity: "",
    status: "Backlog",
    type: "",
  });

  const handleCreateTask = () => {
    onCreateTask(newTask);
    setNewTask({
      taskTitle: "",
      desc: "",
      date: "",
      sprint: "",
      complexity: "",
      status: "Backlog",
      type: "",
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

  return (
    <Modal open={open} title="Task Name" maxWidth="md" onClose={onClose}>
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
        </Stack>
        <Stack direction="row" display="flex" justifyContent="flex-end" gap={1}>
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
  );
};

export default CreateTask;
