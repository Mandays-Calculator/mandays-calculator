import { useTranslation } from "react-i18next";
import React, { useState } from "react";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Grid, Stack, Typography } from "@mui/material";
import LocalizationKey from "~/i18n/key";

import CustomButton from "~/components/form/button/CustomButton";
import { Select, TextField, Modal } from "~/components";
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
  comments: {
    name: string;
    comment: string;
  }[];
}

interface CreateModalProps {
  open: boolean;
  onClose: () => void;
  onCreateTask: (task: Task) => void;
  reOpenCreateTask: () => void;
}

const initialTaskState: Task = {
  taskTitle: "",
  desc: "",
  date: "12/16/2023",
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
};

const CreateTask: React.FC<CreateModalProps> = ({
  open,
  onClose,
  onCreateTask,
  reOpenCreateTask,
}) => {
  const { t } = useTranslation();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newTask, setNewTask] = useState<Task>(initialTaskState);
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
      <Modal open={open} title={t(LocalizationKey.tasks.createTask.modalTitle)} maxWidth="sm" onClose={onClose}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="taskTitle"
              label={t(LocalizationKey.tasks.createTask.label.taskTitle)}
              fullWidth
              onChange={(e) =>
                setNewTask({ ...newTask, taskTitle: e.target.value })
              }
              value={newTask.taskTitle}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="description"
              label={t(LocalizationKey.tasks.createTask.label.description)}
              fullWidth
              multiline
              rows={4}
              maxRows={4}
              onChange={(e) => setNewTask({ ...newTask, desc: e.target.value })}
              value={newTask.desc}
            />
          </Grid>

          <Grid item container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Stack gap={1}>
                <Typography>{t(LocalizationKey.tasks.createTask.label.functionality)}</Typography>
                <Select
                  name="functionality"
                  placeholder={t(LocalizationKey.tasks.createTask.placeholder.functionality)}
                  fullWidth
                  onChange={(e) =>
                    handleSelectChange(
                      "functionality",
                      e.target.value as string
                    )
                  }
                  value={newTask.functionality}
                  options={[
                    { value: "functionality1", label: "Functionality 1" },
                    { value: "functionality2", label: "Functionality 2" },
                    { value: "functionality3", label: "Functionality 3" },
                  ]}
                />
              </Stack>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Stack gap={1}>
                <Stack
                  direction="row"
                  spacing={1}
                  onClick={() => handleOpenComplexity()}
                  style={{ cursor: "pointer" }}
                >
                  <Typography>{t(LocalizationKey.tasks.createTask.label.complexity)}</Typography>
                  <InfoOutlinedIcon fontSize="small" />
                </Stack>

                <Select
                  name="complexity"
                  placeholder={t(LocalizationKey.tasks.createTask.placeholder.complexity)}
                  defaultValue="simple"
                  fullWidth
                  onChange={(e) =>
                    handleSelectChange("complexity", e.target.value as string)
                  }
                  value={newTask.complexity}
                  options={[
                    { value: "complexity1", label: "Complexity 1", },
                    { value: "complexity2", label: "Complexity 2", },
                    { value: "complexity3", label: "Complexity 3", },
                  ]}
                />
              </Stack>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Stack>
              <Typography>{t(LocalizationKey.tasks.createTask.label.tags)}</Typography>
              <Select
                name="tags"
                placeholder={t(LocalizationKey.tasks.createTask.placeholder.tags)}
                multiple={true}
                fullWidth
                onChange={(e) => setSelectedTags(e.target.value as string[])}
                value={selectedTags}
                options={[
                  { value: "tag1", label: "Tag 1" },
                  { value: "tag2", label: "Tag 2" },
                  { value: "tag3", label: "Tag 3" },
                ]}
              />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Stack
              direction="row"
              display="flex"
              justifyContent="flex-end"
            >
              <CustomButton type="button" colorVariant="primary" onClick={handleCreateTask}>
                Create
              </CustomButton>
            </Stack>
          </Grid>
        </Grid>
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
