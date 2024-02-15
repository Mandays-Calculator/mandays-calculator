import type {
  CreateOrUpdateFunctionality,
  AllTasksResponse,
  Complexity,
  CreateTask,
  UpdateTask,
  Tag,
} from "~/api/tasks";
import type { ReactElement } from "react";

import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import { Grid, IconButton, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LocalizationKey from "~/i18n/key";
import { useFormik } from "formik";
import _ from "lodash";

import { usePostTasks, useUpdateTask } from "~/queries/tasks/Tasks";
import { CustomButton } from "~/components/form/button";
import { Form, Modal } from "~/components";
import {
  ControlledTextField,
  ControlledSelect,
} from "~/components/form/controlled";

import { CreateOrUpdateLabel, ComplexityLabel, CloseContainer } from "./style";
import ComplexityDetails from "./complexity-details";

import { Status, StatusValues } from "./utils";

interface CreateOrUpdateTaskProps {
  open: boolean;
  update?: boolean;
  teamId: string;
  complexities: SelectObject[];
  functionalities: SelectObject[];
  tagsOption: SelectObject[];
  currentTask?: AllTasksResponse | null;
  onCreateTask?: (task: AllTasksResponse) => void;
  onUpdateTask?: (task: AllTasksResponse) => void;
  onOpenCreateTask?: () => void;
  onOpenUpdateTask?: (task: AllTasksResponse) => void;
  onClose: () => void;
}

const initialTaskState: AllTasksResponse = {
  name: "",
  description: "",
  completionDate: "",
  functionality: {
    id: "",
    name: "",
    team: {
      id: "",
    },
  },
  tags: [],
  complexity: {
    id: "",
  },
  sprint: "1",
};

const CreateOrUpdateTask = (props: CreateOrUpdateTaskProps): ReactElement => {
  const {
    open,
    update = false,
    teamId,
    complexities,
    functionalities,
    tagsOption,
    currentTask,
    onCreateTask,
    onUpdateTask,
    onOpenCreateTask,
    onOpenUpdateTask,
    onClose,
  } = props;

  const { t } = useTranslation();
  const [task, setTask] = useState<AllTasksResponse>(
    currentTask || initialTaskState,
  );
  const [openComplexity, setOpenComplexity] = useState<boolean>(false);

  const postTasks = usePostTasks();
  const putTasks = useUpdateTask();

  useEffect(() => {
    if (update && currentTask) {
      createOrUpdateForm.setValues({
        ...currentTask,
        _functionality: currentTask.functionality.id,
        _tags: _.map(currentTask?.tags, "id") as string[],
        _complexity: currentTask.complexity.id,
      });
    }
  }, [currentTask]);

  // CRUD
  const createOrUpdateForm = useFormik({
    initialValues: task,
    onSubmit: (e: AllTasksResponse) => createOrUpdateFormSubmit(e),
  });

  const createOrUpdateFormSubmit = (taskData: AllTasksResponse) => {
    if (update && onUpdateTask) {
      handleUpdateTask(taskData);
    } else if (onCreateTask) {
      handleCreateTask(taskData);
      resetCreation();
      createOrUpdateForm.resetForm();
    }

    onClose();
  };

  const handleCreateTask = (taskData: AllTasksResponse) => {
    const createData: CreateTask = {
      name: taskData.name,
      description: taskData.description,
      functionality: getFunctionalityDetails(taskData._functionality as string),
      tags: getTags(taskData._tags as string[]),
      complexityId: getComplexityDetails(taskData._complexity as string),
    };

    postTasks.mutate(createData);
  };

  const handleUpdateTask = (taskData: AllTasksResponse) => {
    const updatedData: UpdateTask = {
      id: taskData.id as string,
      name: taskData.name,
      description: taskData.description,
      status: StatusValues[taskData.status as Status],
      functionality: getFunctionalityDetails(taskData._functionality as string),
      tags: getTags(taskData._tags as string[]),
      comment: null,
      complexityId: getComplexityDetails(taskData._complexity as string),
    };

    putTasks.mutate(updatedData);
  };

  // EVENT CHANGES
  const getFunctionalityDetails = (e: string): CreateOrUpdateFunctionality => {
    const selectedFunctionality = _.find(
      functionalities,
      _.matchesProperty("value", e),
    );

    const functionality: CreateOrUpdateFunctionality = {
      id: e as string,
      name: selectedFunctionality?.label as string,
      teamId: teamId,
    };

    return functionality;
  };

  const getComplexityDetails = (e: string): string => {
    const selectedComplexity = _.find(
      complexities,
      _.matchesProperty("value", e),
    );

    const complexity: Complexity = {
      id: e as string,
      name: selectedComplexity?.label as string,
    };

    return complexity.id;
  };

  const getTags = (e: string[]) => {
    const _selectedTags = e as string[];
    let tags: Tag[] = [];

    _selectedTags.map((selectedTag) => {
      const findSelectedTag = _.find(
        tagsOption,
        _.matchesProperty("value", selectedTag),
      );

      const tag: Tag = {
        id: selectedTag,
        name: findSelectedTag?.label as string,
      };

      tags.push(tag);
    });

    return tags;
  };

  // MODALS
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

  const resetCreation = () => {
    setTask(initialTaskState);
  };

  const onCloseCreateOrUpdateTask = () => {
    resetCreation();
    onClose();
  };

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
        onClose={onCloseCreateOrUpdateTask}
      >
        <CloseContainer>
          <IconButton onClick={() => onCloseCreateOrUpdateTask()}>
            <CloseIcon />
          </IconButton>
        </CloseContainer>

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
                <CreateOrUpdateLabel>
                  {t(LocalizationKey.tasks.createTask.label.functionality)}
                </CreateOrUpdateLabel>
                <ControlledSelect
                  name="_functionality"
                  placeholder={t(
                    LocalizationKey.tasks.createTask.placeholder.functionality,
                  )}
                  fullWidth
                  options={functionalities}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <ComplexityLabel
                  direction="row"
                  spacing={1}
                  onClick={() => handleOpenComplexity()}
                >
                  <CreateOrUpdateLabel>
                    {t(LocalizationKey.tasks.createTask.label.complexity)}
                  </CreateOrUpdateLabel>
                  <InfoOutlinedIcon fontSize="small" />
                </ComplexityLabel>
                <ControlledSelect
                  name="_complexity"
                  placeholder={t(
                    LocalizationKey.tasks.createTask.placeholder.complexity,
                  )}
                  fullWidth
                  options={complexities}
                />
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <CreateOrUpdateLabel>
                {t(LocalizationKey.tasks.createTask.label.tags)}
              </CreateOrUpdateLabel>
              <ControlledSelect
                name="_tags"
                placeholder={t(
                  LocalizationKey.tasks.createTask.placeholder.tags,
                )}
                multiple={true}
                fullWidth
                options={tagsOption}
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
