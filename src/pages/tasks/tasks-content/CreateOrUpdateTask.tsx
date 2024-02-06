import type { AllTasksResponse, CreateTask } from "~/api/tasks";
// import type { SelectChangeEvent } from "@mui/material";
import type { ReactElement } from "react";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CloseIcon from "@mui/icons-material/Close";
import LocalizationKey from "~/i18n/key";
import moment from "moment";
import _ from "lodash";

import { Modal, Form } from "~/components";
import { CustomButton } from "~/components/form/button";

import { createOrUpdatetaskStyles, taskStyles } from "./style";
import ComplexityDetails from "./complexity-details";
import {
  ControlledSelect,
  ControlledTextField,
} from "~/components/form/controlled";
import { useFormik } from "formik";
import { usePostTasks } from "~/queries/tasks/Tasks";

interface CreateOrUpdateTaskProps {
  open: boolean;
  update?: boolean;
  complexities: SelectObject[];
  currentTask?: AllTasksResponse | null;
  onCreateTask?: (task: AllTasksResponse) => void;
  onUpdateTask?: (task: AllTasksResponse) => void;
  onOpenCreateTask?: () => void;
  onOpenUpdateTask?: (task: AllTasksResponse) => void;
  onClose: () => void;
}

const initialTaskState: AllTasksResponse = {
  taskID: "", // should be empty when api is integrated
  name: "",
  description: "",
  createdDate: "", // should be empty when api is integrated
  completionDate: "",
  sprint: "1", // should be empty when api is integrated
  complexity: {
    // should be empty when api is integrated
    id: "",
    name: "",
    numberOfHours: "5",
    numberOfFeatures: "50+",
    description: "",
    sample: "",
    active: true,
  },
  status: "Backlog", // should be empty when api is integrated
  type: "",
  functionality: {
    id: "",
    name: "",
  },
  tags: [],
  comments: [],
};

const functionalityOptions = [
  { value: "2413054d-9945-11ee-a2d5-244bfee2440b", label: "Simple Function" },
  { value: "5583251e-5169-443f-bb9c-4e9cb8e26e77", label: "Design/ UI" },
  { value: "eb9bb9fc-5b9d-4ef6-b0aa-77b49a6dc919", label: "Integration" },
  { value: "d42b21b7-6144-4481-a383-eda3e81a96cc", label: "CRUD" },
  { value: "98031683-47d8-4338-8720-da964a9c7dcd", label: "Feature" },
];

const tagsOptions = [
  { value: "Bug", label: "Bug" },
  { value: "Needs Work", label: "Needs Work" },
  { value: "Reviewed", label: "Reviewed" },
  { value: "Enhancement", label: "Enhancement" },
];

const complexityOptions = [
  // should be removed when api is integrated
  { value: "49a522fe-9945-11ee-a2d5-244bfee2440b", label: "Trivial" },
  { value: "49a522fe-11ee-9945-a2d5-244bfee2440b", label: "Minor" },
  { value: "49a522fe-9945-a2d5-9945-244bfee2440b", label: "Major" },
  { value: "49a522fe-a2d5-11ee-a2d5-244bfee2440b", label: "Blocker" },
];

const CreateOrUpdateTask = (props: CreateOrUpdateTaskProps): ReactElement => {
  const {
    open,
    update = false,
    complexities,
    currentTask,
    onOpenCreateTask,
    onOpenUpdateTask,
    onUpdateTask,
    onClose,
  } = props;

  const { t } = useTranslation();
  const [task, setTask] = useState<AllTasksResponse>(initialTaskState);

  const [openComplexity, setOpenComplexity] = useState<boolean>(false);
  const postTasks = usePostTasks();

  useEffect(() => {
    setTask(currentTask || initialTaskState);
  }, [currentTask]);

  const handleOpenComplexity = (): void => {
    setOpenComplexity(!openComplexity);
    onClose();
  };

  const handleCloseComplexity = () => {
    setOpenComplexity(!openComplexity);
  };

  const handleOpenCreateOrUpdateTask = () => {
    if (update && onOpenUpdateTask) {
      onOpenUpdateTask(currentTask || initialTaskState);
    } else if (onOpenCreateTask) {
      onOpenCreateTask();
    }
  };

  const updateTaskState: AllTasksResponse = {
    taskID: currentTask?.taskID, // should be empty when api is integrated
    name: currentTask?.name,
    description: currentTask?.description,
    createdDate: currentTask?.createdDate, // should be empty when api is integrated
    completionDate: currentTask?.completionDate,
    sprint: "1", // should be empty when api is integrated
    complexity: {
      // should be empty when api is integrated
      id: currentTask?.complexity.id,
      name: currentTask?.complexity.name,
      numberOfHours: "5",
      numberOfFeatures: "50+",
      description: currentTask?.complexity.description,
      sample: currentTask?.complexity.sample,
      active: true,
    },
    status: "Backlog", // should be empty when api is integrated
    type: currentTask?.type,
    functionality: {
      id: currentTask?.functionality?.id,
      name: currentTask?.functionality?.name,
    },
    tags: [],
    comments: [],
  };

  const createOrUpdateForm = useFormik({
    initialValues: update === false ? initialTaskState : updateTaskState,
    onSubmit: (e: AllTasksResponse): void => {
      const submit: CreateTask = {
        name: e.name,
        description: e.description,
        createdDate: moment(e.createdDate).format("yyyy-MM-dd HH:mm:SS"),
        sprint: "1",
        complexityId: e.complexity,
        functionality: {
          id: "b4dddbcc-bf4b-11ee-993e-00090faa0001",
          name: "Test add new task Nov16_009",
          teamId: "a2eb9f01-6e4e-11ee-8624-a0291936d1c2",
        },
        tags: e.tags,
      };

      if (update === false) {
        postTasks.mutate(submit);
        createOrUpdateForm.resetForm();
      }

      if (update === true && onUpdateTask) {
        const updatedTask = {
          ...task,
          ...submit,
        };

        onUpdateTask(updatedTask);
        console.log("update", updatedTask);
      }

      onClose();
    },
  });

  return (
    <>
      <Modal
        open={open}
        title={
          update
            ? t(LocalizationKey.tasks.updateTask.modalTitle)
            : t(LocalizationKey.tasks.createTask.modalTitle)
        }
        maxWidth="sm"
        onClose={onClose}
      >
        <Box sx={taskStyles.modal.close}>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Form instance={createOrUpdateForm}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ControlledTextField
                name="name"
                label={t(LocalizationKey.tasks.createTask.label.taskTitle)}
                placeholder={t(
                  LocalizationKey.tasks.createTask.placeholder.taskTitle,
                )}
                fullWidth
                value={currentTask?.name}
              />
            </Grid>

            <Grid item xs={12}>
              <ControlledTextField
                name="description"
                label={t(LocalizationKey.tasks.createTask.label.description)}
                placeholder={t(
                  LocalizationKey.tasks.createTask.placeholder.description,
                )}
                fullWidth
                multiline
                rows={4}
                value={currentTask?.description}
              />
            </Grid>

            <Grid item container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography sx={createOrUpdatetaskStyles.label}>
                  {t(LocalizationKey.tasks.createTask.label.functionality)}
                </Typography>
                <ControlledSelect
                  name="functionality"
                  placeholder={t(
                    LocalizationKey.tasks.createTask.placeholder.functionality,
                  )}
                  fullWidth
                  options={functionalityOptions}
                  value={currentTask?.functionality?.id}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack
                  direction="row"
                  spacing={1}
                  onClick={() => handleOpenComplexity()}
                  sx={createOrUpdatetaskStyles.complexity}
                >
                  <Typography sx={createOrUpdatetaskStyles.label}>
                    {t(LocalizationKey.tasks.createTask.label.complexity)}
                  </Typography>
                  <InfoOutlinedIcon fontSize="small" />
                </Stack>
                <ControlledSelect
                  name="complexity"
                  placeholder={t(
                    LocalizationKey.tasks.createTask.placeholder.complexity,
                  )}
                  fullWidth
                  options={
                    !_.isEmpty(complexities) ? complexities : complexityOptions
                  }
                  value={currentTask?.complexity.id}
                />
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Typography sx={createOrUpdatetaskStyles.label}>
                {t(LocalizationKey.tasks.createTask.label.tags)}
              </Typography>
              <ControlledSelect
                name="tags"
                placeholder={t(
                  LocalizationKey.tasks.createTask.placeholder.tags,
                )}
                multiple={true}
                fullWidth
                options={tagsOptions}
                value={currentTask?.tags}
              />
            </Grid>
          </Grid>

          <Stack direction="row" justifyContent="flex-end" marginTop={"10px"}>
            <CustomButton type="submit" colorVariant="primary">
              {update
                ? t(LocalizationKey.tasks.updateTask.btnLabel.update)
                : t(LocalizationKey.tasks.createTask.btnLabel.create)}
            </CustomButton>
          </Stack>
        </Form>
      </Modal>

      <ComplexityDetails
        open={openComplexity}
        onClose={handleCloseComplexity}
        openCreateOrUpdateTask={handleOpenCreateOrUpdateTask}
      />
    </>
  );
};

export default CreateOrUpdateTask;
