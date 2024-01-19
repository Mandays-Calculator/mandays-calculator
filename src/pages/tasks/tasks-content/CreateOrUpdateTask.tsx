import { AllTasksResponse } from "~/api/tasks";

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Grid, Stack, Typography } from "@mui/material";
import LocalizationKey from "~/i18n/key";

import CustomButton from "~/components/form/button/CustomButton";
import { Select, TextField, Modal } from "~/components";

// import { useGetComplexities } from "~/queries/complexity/Complexities";

import ComplexityDetails from "./complexity-details";

interface CreateModalProps {
  open: boolean;
  isCreate: boolean;
  task?: AllTasksResponse | null;
  onClose: () => void;
  onCreateTask: (task: AllTasksResponse) => void;
  reOpenCreateTask: () => void;
}

const initialTaskState: AllTasksResponse = {
  taskID: "1",
  name: "",
  description: "",
  createdDate: "11/16/2023",
  completionDate: "12/16/2023",
  sprint: "2",
  complexity: {
    id: "49a522fe-9945-11ee-a2d5-244bfee2440b",
    name: "Sample",
    numberOfHours: "5",
    numberOfFeatures: "50+",
    description: "description",
    sample: "sample",
    active: true,
  },
  status: "Backlog",
  type: "",
  functionality: {
    id: "2413054d-9945-11ee-a2d5-244bfee2440b",
    name: "Simple Function",
  },
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
  const [newTask, setNewTask] = useState<AllTasksResponse>(
    task || initialTaskState
  );
  const [openComplexity, setOpenComplexity] = useState<boolean>(false);

  useEffect(() => {
    setNewTask(task || initialTaskState);
  }, [task]);

  const handleCreateOrUpdateTask = (): void => {
    if (isCreate) {
      onCreateTask(newTask);
      setNewTask(initialTaskState);
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

  // const complexities = useGetComplexities();

  // const complexityData = complexities.data;
  // const complexityList = Array.isArray(complexityData)
  //   ? complexityData?.map((data) => {
  //       return {
  //         label: data.name,
  //         value: data.id,
  //       };
  //     })
  //   : [];

  return (
    <>
      <Modal
        open={open}
        title={
          isCreate
            ? t(LocalizationKey.tasks.createTask.modalTitle)
            : t(LocalizationKey.tasks.updateTask.modalTitle)
        }
        maxWidth="sm"
        onClose={onClose}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="taskTitle"
              label={t(LocalizationKey.tasks.createTask.label.taskTitle)}
              fullWidth
              onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
              value={newTask.name}
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
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              value={newTask.description}
            />
          </Grid>

          <Grid item container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Stack gap={1}>
                <Typography>
                  {t(LocalizationKey.tasks.createTask.label.functionality)}
                </Typography>
                <Select
                  name="functionality"
                  placeholder={t(
                    LocalizationKey.tasks.createTask.placeholder.functionality
                  )}
                  fullWidth
                  onChange={(e) =>
                    handleSelectChange(
                      "functionality",
                      e.target.value as string
                    )
                  }
                  value={newTask.functionality}
                  options={[
                    { value: "functionality1", label: "DESIGN/UI" },
                    { value: "functionality2", label: "ADD" },
                    { value: "functionality3", label: "UPDATE" },
                    { value: "functionality4", label: "DELETE" },
                    { value: "functionality4", label: "INTEGRATION" },
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
                  <Typography>
                    {t(LocalizationKey.tasks.createTask.label.complexity)}
                  </Typography>
                  <InfoOutlinedIcon fontSize="small" />
                </Stack>

                <Select
                  name="complexity"
                  placeholder={t(
                    LocalizationKey.tasks.createTask.placeholder.complexity
                  )}
                  defaultValue="simple"
                  fullWidth
                  onChange={(e) =>
                    handleSelectChange("complexity", e.target.value as string)
                  }
                  value={newTask.complexity}
                  // options={complexityList}
                  options={[
                    { value: "complexity1", label: "Low" },
                    { value: "complexity2", label: "Medium" },
                    { value: "complexity3", label: "High" },
                    { value: "complexity4", label: "Extreme" },
                  ]}
                />
              </Stack>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Stack>
              <Typography>
                {t(LocalizationKey.tasks.createTask.label.tags)}
              </Typography>
              <Select
                name="tags"
                placeholder={t(
                  LocalizationKey.tasks.createTask.placeholder.tags
                )}
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
            <Stack direction="row" display="flex" justifyContent="flex-end">
              <CustomButton
                type="button"
                colorVariant="primary"
                onClick={handleCreateOrUpdateTask}
              >
                {isCreate
                  ? t(LocalizationKey.tasks.createTask.btnLabel.create)
                  : t(LocalizationKey.tasks.updateTask.btnLabel.update)}
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
