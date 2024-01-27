import type { AllTasksResponse, Complexity, Functionality } from "~/api/tasks";
import type { SelectChangeEvent } from "@mui/material";
import type { ReactElement } from "react";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CloseIcon from "@mui/icons-material/Close";
import LocalizationKey from "~/i18n/key";
import moment from "moment";
import _ from "lodash";

import { Select, TextField, Modal } from "~/components";
import { CustomButton } from "~/components/form/button";

import ComplexityDetails from "./complexity-details";
import { viewTaskDetailsStyle } from "./style";

interface CreateOrUpdateTaskProps {
  open: boolean;
  update?: boolean;
  currentTask?: AllTasksResponse | null;
  complexities: SelectObject[];
  onClose: () => void;
  onCreateTask?: (task: AllTasksResponse) => void;
  onUpdateTask?: (task: AllTasksResponse) => void;
  onOpenCreateOrUpdateTask: () => void;
}

const initialTaskState: AllTasksResponse = {
  taskID: "", // should be empty when api is integrated
  name: "",
  description: "",
  createdDate: moment().format("L"), // should be empty when api is integrated
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

const CreateOrUpdateTask = (props: CreateOrUpdateTaskProps): ReactElement => {
  const {
    open,
    currentTask,
    update = false,
    onClose,
    complexities,
    onCreateTask,
    onUpdateTask,
    onOpenCreateOrUpdateTask,
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
      setSelectedTags(_.map(currentTask?.tags, "value"));
    }
  }, [currentTask]);

  const handleCreateOrUpdateTask = (): void => {
    if (update && onUpdateTask) {
      onUpdateTask(task);
    } else if (onCreateTask) {
      onCreateTask(task);
      setTask(initialTaskState);
    }

    onClose();
  };

  const handleChangeFunctionality = (e: SelectChangeEvent<unknown>) => {
    const functionality: Functionality = {
      id: e.target.value as string,
      name: e.target.name as string,
    };
    setTask({ ...task, functionality });
  };

  const handleChangeComplexity = (e: SelectChangeEvent<unknown>) => {
    const complexity: Complexity = {
      id: e.target.value as string,
      name: e.target.name as string,
      active: true,
      description: e.target.name as string,
      numberOfFeatures: "",
      numberOfHours: "",
      sample: e.target.name as string,
    };
    setTask({ ...task, complexity });
  };

  const handleChangeTags = (e: SelectChangeEvent<unknown>) => {
    const _selectedTags = e.target.value as string[];
    let tags: SelectObject[] = [];

    _selectedTags.map(selectedTag => {
      const tag: SelectObject = {
        label: selectedTag,
        value: selectedTag,
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
        onClose={onClose}
      >
        <Box sx={viewTaskDetailsStyle.modal.close}>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name='name'
              label={t(LocalizationKey.tasks.createTask.label.taskTitle)}
              fullWidth
              onChange={e => setTask({ ...task, name: e.target.value })}
              value={task.name}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name='description'
              label={t(LocalizationKey.tasks.createTask.label.description)}
              fullWidth
              multiline
              rows={4}
              onChange={e => setTask({ ...task, description: e.target.value })}
              value={task.description}
            />
          </Grid>

          <Grid item container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography>
                {t(LocalizationKey.tasks.createTask.label.functionality)}
              </Typography>
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
              <Stack
                direction='row'
                spacing={1}
                onClick={() => handleOpenComplexity()}
                sx={{ cursor: "pointer" }}
              >
                <Typography>
                  {t(LocalizationKey.tasks.createTask.label.complexity)}
                </Typography>
                <InfoOutlinedIcon fontSize='small' />
              </Stack>
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
            <Typography>
              {t(LocalizationKey.tasks.createTask.label.tags)}
            </Typography>
            <Select
              name='tags'
              placeholder={t(LocalizationKey.tasks.createTask.placeholder.tags)}
              multiple={true}
              fullWidth
              onChange={handleChangeTags}
              value={selectedTags}
              options={[
                { value: "Bug", label: "Bug" },
                { value: "Needs Work", label: "Needs Work" },
              ]}
            />
          </Grid>
        </Grid>

        <Stack direction='row' justifyContent='flex-end'>
          <CustomButton
            type='button'
            colorVariant='primary'
            onClick={handleCreateOrUpdateTask}
          >
            {update
              ? t(LocalizationKey.tasks.updateTask.btnLabel.update)
              : t(LocalizationKey.tasks.createTask.btnLabel.create)}
          </CustomButton>
        </Stack>
      </Modal>

      <ComplexityDetails
        open={openComplexity}
        onClose={() => setOpenComplexity(!openComplexity)}
        openCreateTask={() => onOpenCreateOrUpdateTask()}
      />
    </>
  );
};

export default CreateOrUpdateTask;
