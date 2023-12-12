import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Grid, Stack, Typography } from "@mui/material";
import LocalizationKey from "~/i18n/key";

import CustomButton from "~/components/form/button/CustomButton";
import { Select, TextField, Modal } from "~/components";

import ComplexityDetails from "./complexity-details";
import { Task } from "./type";
interface CreateModalProps {
  open: boolean;
  isCreate: boolean;
  task?: Task | null;
  onClose: () => void;
  onCreateTask: (task: Task) => void;
  reOpenCreateTask: () => void;
}

const initialTaskState: Task = {
  taskID: "100",
  taskTitle: "Sample",
  desc: "",
  date: "12/16/2023",
  sprint: "2",
  complexity: "",
  status: "Backlog",
  type: "",
  functionality: "",
  tags: [],
  comments: [
    {
      name: "Zad Geron",
      comment: "This is a test",
    },
  ],
};

const CreateOrUpdateTask: React.FC<CreateModalProps> = ({
  open,
  isCreate,
  task,
  onClose,
  onCreateTask,
  reOpenCreateTask,
}) => {
  const { t } = useTranslation();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newTask, setNewTask] = useState<Task>(task || initialTaskState);
  const [openComplexity, setOpenComplexity] = useState<boolean>(false);

  console.log(task)

  useEffect(() => {
    setNewTask(task || initialTaskState);
    setSelectedTags(task?.tags || []);
  }, [task]);

  const handleCreateOrUpdateTask = (): void => {
    if (isCreate) {
      onCreateTask(newTask);
      setNewTask(initialTaskState);
      setSelectedTags([]);
    } else {
      onCreateTask(newTask);
    }

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
      <Modal open={open}
        title={isCreate ? t(LocalizationKey.tasks.createTask.modalTitle) : t(LocalizationKey.tasks.updateTask.modalTitle)}
        maxWidth="sm" onClose={onClose}>
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
              <CustomButton type="button" colorVariant="primary" onClick={handleCreateOrUpdateTask}>
                {t(LocalizationKey.tasks.createTask.btnLabel.create)}
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

export default CreateOrUpdateTask;
