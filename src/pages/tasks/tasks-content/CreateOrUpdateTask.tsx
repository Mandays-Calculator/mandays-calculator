import type { AllTasksResponse, CreateTask, UpdateTask } from "~/api/tasks";

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
import { usePostTasks, useUpdateTask } from "~/queries/tasks/Tasks";

interface CreateOrUpdateTaskProps {
  open: boolean;
  update?: boolean;
  complexities: SelectObject[];
  funcionalities: SelectObject[];
  currentTask?: AllTasksResponse | null;
  onCreateTask?: (task: AllTasksResponse) => void;
  onUpdateTask?: (task: AllTasksResponse) => void;
  onOpenCreateTask?: () => void;
  onOpenUpdateTask?: (task: AllTasksResponse) => void;
  refetchTasks: () => void;
  onClose: () => void;
}

const initialTaskState: AllTasksResponse = {
  taskID: "",
  name: "",
  description: "",
  createdDate: "",
  completionDate: "",
  sprint: "1",
  complexity: {
    id: "",
    name: "",
    numberOfHours: "",
    numberOfFeatures: "",
    description: "",
    sample: "",
    active: true,
  },
  status: "Backlog",
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
    funcionalities,
    currentTask,
    onOpenCreateTask,
    onOpenUpdateTask,
    // onUpdateTask,
    refetchTasks,
    onClose,
  } = props;

  const { t } = useTranslation();
  const [task, setTask] = useState<AllTasksResponse>(initialTaskState);

  const [openComplexity, setOpenComplexity] = useState<boolean>(false);
  const postTasks = usePostTasks();
  const putTasks = useUpdateTask();

  useEffect(() => {
    setTask(currentTask || initialTaskState);
  }, [currentTask]);

  useEffect(() => {
    createOrUpdateForm.setValues(task);
  }, [task]);

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

  const createOrUpdateForm = useFormik({
    initialValues: initialTaskState,
    onSubmit: (e: AllTasksResponse): void => {
      const postSubmit: CreateTask = {
        name: e.name,
        description: e.description,
        createdDate: moment().format("yyyy-MM-dd HH:mm:SS"),
        sprint: "1",
        complexityId: e.complexity.id,
        functionality:
          // e.functionality,
          {
            id: "b4dddbcc-bf4b-11ee-993e-00090faa0001",
            name: "Test add new task Nov16_009",
            teamId: "a2eb9f01-6e4e-11ee-8624-a0291936d1c2",
          },
        tags: e.tags,
      };

      const putSubmit: UpdateTask = {
        id: e.id,
        name: e.name,
        description: e.description,
        status: 1,
        functionality:
          //  e.functionality,
          {
            id: "b4dddbcc-bf4b-11ee-993e-00090faa0001",
            name: "Test add new task Nov16_009",
            teamId: "a2eb9f01-6e4e-11ee-8624-a0291936d1c2",
          },
        tags: [
          {
            id: "6fcb4dbd-c618-11ee-ae82-00090faa0001",
            name: "Bug",
          },
          {
            id: "882c2b91-c618-11ee-ae82-00090faa0001",
            name: "Need Work",
          },
        ],
        comment: {
          id: "274dc3fe-88e5-11ee-898a-a0291936cc52",
          description: "Test Update Task 003",
        },
        complexityId: e.complexity.id,
      };

      if (update === false) {
        postTasks.mutate(postSubmit, {
          onSuccess: () => {
            refetchTasks();
          },
        });
        createOrUpdateForm.resetForm();
      }

      if (update === true) {
        putTasks.mutate(putSubmit, {
          onSuccess: () => {
            refetchTasks();
          },
        });
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
                  options={
                    !_.isEmpty(funcionalities)
                      ? funcionalities
                      : functionalityOptions
                  }
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
                  name="complexity.id"
                  placeholder={t(
                    LocalizationKey.tasks.createTask.placeholder.complexity,
                  )}
                  fullWidth
                  options={
                    !_.isEmpty(complexities) ? complexities : complexityOptions
                  }
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
