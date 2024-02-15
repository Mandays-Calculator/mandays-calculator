import type { AllTasksResponse } from "~/api/tasks/types";
import type { ReactElement } from "react";

import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useTranslation } from "react-i18next";
import { useState } from "react";

import { SelectChangeEvent, Typography, Grid } from "@mui/material";
import LocalizationKey from "~/i18n/key";

import { useCommonOption } from "~/queries/common/options";
import { useDeleteTask } from "~/queries/tasks/Tasks";
import { Select, PageContainer } from "~/components";
import { ConfirmModal } from "~/components";
import { useUserAuth } from "~/hooks/user";

import CreateOrUpdateTask from "./CreateOrUpdateTask";
import ViewTaskDetails from "./ViewTaskDetails";
import { Status } from "./utils";

import NoTask from "~/assets/img/empty_tasks.png";

import {
  calculateGridSize,
  TaskGridContainer,
  NoDataContainer,
  StyledDivider,
  StyledLink,
} from "./style";
import StatusContainer from "./StatusContainer";

const teamOptions = [
  { value: "MC", label: "MC" },
  { value: "BME", label: "BME" },
  { value: "eMPF", label: "eMPF" },
  { value: "CMT", label: "CMT" },
];

const TEAM_ID = "a2eb9f01-6e4e-11ee-8624-a0291936d1c2";

const TasksContent = (): ReactElement => {
  const { t } = useTranslation();

  const {
    state: { user },
  } = useUserAuth();
  const userDetails = user;
  const complexities = useCommonOption("complexity");
  const functionalities = useCommonOption("function", "");

  const [selectedTeam, setSelectedTeam] = useState<string | null>("");
  const [selectedTask, setSelectedTask] = useState<AllTasksResponse | null>(
    null,
  );
  const [selectedTaskForDelete, setSelectedTaskForDelete] =
    useState<AllTasksResponse | null>(null);

  const [viewDetailsModalOpen, setViewDetailsModalOpen] =
    useState<boolean>(false);
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const deleteMutation = useDeleteTask();

  // OTHERS
  const handleTeamFilter = (e: SelectChangeEvent<unknown>) => {
    setSelectedTeam(e.target.value as string);
  };

  // DRAG N DROP
  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    const sourceStatus = source.droppableId;
    const destinationStatus = destination.droppableId;

    if (
      (sourceStatus === Status.Backlog &&
        destinationStatus === Status.OnHold) ||
      (sourceStatus === Status.OnHold && destinationStatus === Status.Backlog)
    ) {
      if (draggableId) {
        // Add Change Status
      }
    }
  };

  // OPENING OF MODALS
  const handleViewDetailsModalState = (task: AllTasksResponse) => {
    setSelectedTask(task);
    setViewDetailsModalOpen(!viewDetailsModalOpen);
  };

  const handleCreateModalState: () => void = () => {
    setCreateModalOpen(!createModalOpen);
  };

  const handleUpdateModalState = (task: AllTasksResponse) => {
    setSelectedTask(task);
    setUpdateModalOpen(!updateModalOpen);
  };

  const handleDeleteModalState = (task: AllTasksResponse) => {
    setSelectedTaskForDelete(task);
    setDeleteModalOpen(!deleteModalOpen);
  };

  // CLOSING OF MODALS
  const handleCloseViewDetailsModalState = () => {
    setViewDetailsModalOpen(false);
  };

  const handleCloseCreateModalState = () => {
    setCreateModalOpen(false);
  };

  const handleCloseUpdateModalState = () => {
    setUpdateModalOpen(false);
  };

  const handleCloseDeleteModalState = () => {
    setDeleteModalOpen(false);
  };

  // CRUD
  const handleCreateTask = (newTask: AllTasksResponse | null) => {
    // if (newTask) {
    //   const createdData = [...tasks, newTask];
    //   setTasks(createdData);
    // }
    console.log(newTask);
  };

  const handleUpdateTask = (updatedTask: AllTasksResponse): void => {
    // const updatedData = tasks.map(task => {
    //   if (task.id === updatedTask.id) {
    //     return updatedTask;
    //   }
    //   return task;
    // });
    // setTasks(updatedData);
    console.log(updatedTask);
  };

  const handleDeleteTask = () => {
    if (selectedTaskForDelete?.id) {
      const { id: taskID } = selectedTaskForDelete;

      deleteMutation.mutate(
        { id: taskID },
        {
          onSuccess: () => {
            // const updatedTasks = tasks.filter(task => task.id !== taskID);
            // setTasks(updatedTasks);
            setSelectedTaskForDelete(null);
          },
          onError: error => {
            console.log(error);
          },
        },
      );
    }

    handleCloseDeleteModalState();
  };

  // RENDER
  const renderTaskContentModals = () => {
    return (
      <>
        <CreateOrUpdateTask
          open={createModalOpen}
          teamId={TEAM_ID} // change this when team api is integrated
          complexities={complexities}
          functionalities={functionalities}
          onCreateTask={handleCreateTask}
          onOpenCreateTask={handleCreateModalState}
          onClose={handleCloseCreateModalState}
        />
        <CreateOrUpdateTask
          open={updateModalOpen}
          update
          teamId={TEAM_ID} // change this when team api is integrated
          complexities={complexities}
          functionalities={functionalities}
          currentTask={selectedTask}
          onUpdateTask={handleUpdateTask}
          onOpenUpdateTask={handleUpdateModalState}
          onClose={handleCloseUpdateModalState}
        />
        <ViewTaskDetails
          open={viewDetailsModalOpen}
          userDetails={userDetails}
          task={selectedTask}
          onSave={handleUpdateTask}
          onClose={handleCloseViewDetailsModalState}
        />
      </>
    );
  };

  const renderNoTask = () => {
    return (
      <NoDataContainer>
        <img src={NoTask} alt={t(LocalizationKey.tasks.noTask)} />
        <Typography variant='h5' fontWeight='bold'>
          {t(LocalizationKey.tasks.errorMessage.error)}
        </Typography>
        <Typography variant='body2' fontWeight='bold'>
          {t(LocalizationKey.tasks.errorMessage.started)}
          <StyledLink
            underline='hover'
            variant='body2'
            fontWeight='bold'
            onClick={() => handleCreateModalState()}
          >
            {t(LocalizationKey.tasks.errorMessage.created)}
          </StyledLink>
        </Typography>
      </NoDataContainer>
    );
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <PageContainer>
          <Grid container>
            <Grid item xs={calculateGridSize(Object.values(Status).length)}>
              <Select
                name='teamFilter'
                placeholder={t(LocalizationKey.tasks.teamFilter)}
                options={teamOptions}
                onChange={handleTeamFilter}
                value={selectedTeam}
              />
            </Grid>
          </Grid>

          <StyledDivider />

          <TaskGridContainer
            container
            spacing={1}
            justifyContent='space-between'
          >
            {Object.values(Status).map(status => {
              if (status !== Status.Invalid) {
                return (
                  <StatusContainer
                    status={status}
                    teamId={TEAM_ID}
                    handleViewDetailsModalState={handleViewDetailsModalState}
                    handleCreateModalState={handleCreateModalState}
                    handleUpdateModalState={handleUpdateModalState}
                    handleDeleteModalState={handleDeleteModalState}
                  />
                );
              }
            })}
          </TaskGridContainer>

          {renderNoTask()}
        </PageContainer>
      </DragDropContext>

      {renderTaskContentModals()}

      <ConfirmModal
        open={deleteModalOpen}
        onConfirm={handleDeleteTask}
        onClose={handleCloseDeleteModalState}
        message={`${t(LocalizationKey.tasks.taskDetails.deleteConfirm)} ${
          selectedTaskForDelete?.name
        }?`}
      />
    </>
  );
};

export default TasksContent;
