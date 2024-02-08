import type {
  AllTasksResponse,
  Complexity,
  Functionality,
  CreateTask,
  Tag,
} from "~/api/tasks";
import type { SelectChangeEvent } from "@mui/material";
import type { ReactElement } from "react";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import { Grid, IconButton, Stack } from "@mui/material";
import { usePostTasks } from "~/queries/tasks/Tasks";
import CloseIcon from "@mui/icons-material/Close";
import LocalizationKey from "~/i18n/key";
import {
  ControlledTextField,
  ControlledSelect,
} from "~/components/form/controlled";
import { useFormik } from "formik";
import moment from "moment";
import _ from "lodash";

import { Select, TextField, Modal } from "~/components";
import { CustomButton } from "~/components/form/button";

import { CreateOrUpdateLabel, ComplexityLabel, CloseContainer } from "./style";
import ComplexityDetails from "./complexity-details";
import { Status } from "./utils";

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
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [openComplexity, setOpenComplexity] = useState<boolean>(false);

  useEffect(() => {
    setTask(currentTask || initialTaskState);

    if (update) {
      setSelectedTags(_.map(currentTask?.tags, "name"));
    }
  }, [currentTask]);

  const handleCreateOrUpdateTask = (): void => {
    if (update && onUpdateTask) {
      onUpdateTask(task);
    } else if (onCreateTask) {
      onCreateTask(task);
      setTask(initialTaskState);
      resetCreation();
    }

    onClose();
  };

  const handleChangeFunctionality = (e: SelectChangeEvent<unknown>) => {
    const selectedFunctionality = _.find(
      functionalityOptions,
      _.matchesProperty("value", e.target.value),
    );

    const functionality: Functionality = {
      id: e.target.value as string,
      name: selectedFunctionality?.label as string,
      team: {
        id: "",
      },
    };
    setTask({ ...task, functionality });
  };

  const handleChangeComplexity = (e: SelectChangeEvent<unknown>) => {
    const complexity: Complexity = {
      id: e.target.value as string,
    };
    setTask({ ...task, complexity });
  };

  const handleChangeTags = (e: SelectChangeEvent<unknown>) => {
    const _selectedTags = e.target.value as string[];
    let tags: Tag[] = [];

    _selectedTags.map(selectedTag => {
      const tag: Tag = {
        id: selectedTag,
        name: selectedTag,
      };

      tags.push(tag);
    });

    setTask({ ...task, tags });
    setSelectedTags(_selectedTags);
  };

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
    setSelectedTags([]);
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
        maxWidth='sm'
        onClose={onCloseCreateOrUpdateTask}
      >
        <CloseContainer>
          <IconButton onClick={() => onCloseCreateOrUpdateTask()}>
            <CloseIcon />
          </IconButton>
        </CloseContainer>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name='name'
              label={t(LocalizationKey.tasks.createTask.label.taskTitle)}
              placeholder={t(
                LocalizationKey.tasks.createTask.placeholder.taskTitle,
              )}
              fullWidth
              onChange={e => setTask({ ...task, name: e.target.value })}
              value={task.name}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name='description'
              label={t(LocalizationKey.tasks.createTask.label.description)}
              placeholder={t(
                LocalizationKey.tasks.createTask.placeholder.description,
              )}
              fullWidth
              multiline
              rows={4}
              onChange={e => setTask({ ...task, description: e.target.value })}
              value={task.description}
            />
          </Grid>

          <Grid item container spacing={2}>
            <Grid item xs={12} sm={6}>
              <CreateOrUpdateLabel>
                {t(LocalizationKey.tasks.createTask.label.functionality)}
              </CreateOrUpdateLabel>
              <Select
                name='functionality'
                placeholder={t(
                  LocalizationKey.tasks.createTask.placeholder.functionality,
                )}
                fullWidth
                onChange={handleChangeFunctionality}
                value={task.functionality.id}
                options={functionalityOptions}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <ComplexityLabel
                direction='row'
                spacing={1}
                onClick={() => handleOpenComplexity()}
              >
                <CreateOrUpdateLabel>
                  {t(LocalizationKey.tasks.createTask.label.complexity)}
                </CreateOrUpdateLabel>
                <InfoOutlinedIcon fontSize='small' />
              </ComplexityLabel>
              <Select
                name='complexity'
                placeholder={t(
                  LocalizationKey.tasks.createTask.placeholder.complexity,
                )}
                fullWidth
                onChange={handleChangeComplexity}
                value={task.complexity.id}
                options={
                  !_.isEmpty(complexities) ? complexities : complexityOptions
                } // should be updated when api is integrated
              />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <CreateOrUpdateLabel>
              {t(LocalizationKey.tasks.createTask.label.tags)}
            </CreateOrUpdateLabel>
            <Select
              name='tags'
              placeholder={t(LocalizationKey.tasks.createTask.placeholder.tags)}
              multiple={true}
              fullWidth
              onChange={handleChangeTags}
              value={selectedTags}
              options={tagsOptions}
            />
          </Grid>
        </Grid>

        <Stack direction='row' justifyContent='flex-end' marginTop={"10px"}>
          <CustomButton
            type='button'
            colorVariant='primary'
            onClick={() => handleCreateOrUpdateTask()}
          >
            {update
              ? t(LocalizationKey.tasks.updateTask.btnLabel.update)
              : t(LocalizationKey.tasks.createTask.btnLabel.create)}
          </CustomButton>
        </Stack>
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
