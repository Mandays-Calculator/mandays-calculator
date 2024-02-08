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

import { FUNCTIONALITY_OPTIONS } from "~/__tests__/pages/tasks/utils/utils";

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

const setFunctionalityOptions = (functionalityData: Functionality[]) => {
  let functionalityOptions: SelectObject[] = [];

  functionalityData.map(_functionality => {
    const functionality: SelectObject = {
      label: _functionality.name,
      value: _functionality.id,
    };

    functionalityOptions.push(functionality);
  });

  return functionalityOptions;
};

const tagsOptions = [
  { value: "Bug", label: "Bug" },
  { value: "Needs Work", label: "Needs Work" },
  { value: "Reviewed", label: "Reviewed" },
  { value: "Enhancement", label: "Enhancement" },
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
      FUNCTIONALITY_OPTIONS,
      _.matchesProperty("id", e.target.value),
    );

    const functionality: Functionality = {
      id: e.target.value as string,
      name: selectedFunctionality?.name as string,
      team: {
        id: selectedFunctionality?.team.id as string,
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
                options={setFunctionalityOptions(FUNCTIONALITY_OPTIONS)}
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
                options={complexities}
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
