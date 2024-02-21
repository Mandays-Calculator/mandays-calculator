import type {
  AllTasksResponse,
  ForTaskStateChange,
  UpdateTaskStatus,
} from "~/api/tasks/types";
import type { ReactElement } from "react";

import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useTranslation } from "react-i18next";
import { useState } from "react";

import { SelectChangeEvent, Typography, Grid } from "@mui/material";
import LocalizationKey from "~/i18n/key";

import { useCommonOption } from "~/queries/common/options";
import {
  useDeleteTask,
  useGetTags,
  useUpdateTaskStatus,
} from "~/queries/tasks/Tasks";
import { Select, PageContainer } from "~/components";
import { ConfirmModal } from "~/components";
import { useUserAuth } from "~/hooks/user";

import CreateOrUpdateTask from "./CreateOrUpdateTask";
import ViewTaskDetails from "./ViewTaskDetails";
import { Status, StatusValues } from "./utils";

import NoTask from "~/assets/img/empty_tasks.png";

import {
  calculateGridSize,
  TaskGridContainer,
  NoDataContainer,
  StyledDivider,
  StyledLink,
} from "./style";
import StatusContainer from "./StatusContainer";

const TEAM_ID = "a2eb9f01-6e4e-11ee-8624-a0291936d1c2";

const TasksContent = (): ReactElement => {
  const { t } = useTranslation();

  const {
    state: { user },
  } = useUserAuth();
  const userDetails = user;

  // DROPDOWN OPTIONS
  const teams = useCommonOption("team_userid", userDetails?.id);
  const [selectedTeam, setSelectedTeam] = useState<string>(TEAM_ID);

  const complexities = useCommonOption("complexity");
  const functionalities = useCommonOption("function", {
    teamId: selectedTeam,
    name: "",
  });

  const tagsValue = useGetTags();
  const tagsOption = tagsValue.data?.map((e) => ({
    label: e.name,
    value: e.id,
  }));

  // TASK SELECTION
  const [selectedTask, setSelectedTask] = useState<AllTasksResponse | null>(
    null,
  );
  const [selectedTaskForDelete, setSelectedTaskForDelete] =
    useState<AllTasksResponse | null>(null);
  const [hasTaskStateChange, setHasTaskStateChange] =
    useState<ForTaskStateChange | null>(null);

  // MODALS
  const [viewDetailsModalOpen, setViewDetailsModalOpen] =
    useState<boolean>(false);
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const updateStatusMutation = useUpdateTaskStatus();
  const deleteMutation = useDeleteTask();

  // OTHERS
  const handleTeamFilter = (e: SelectChangeEvent<unknown>) => {
    setSelectedTeam(e.target.value as string);
  };

  const resetHasTaskStateChange = () => {
    setHasTaskStateChange(null);
  };

  // DRAG N DROP
  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    const sourceStatus = source.droppableId;
    const destinationStatus = destination.droppableId;
    const updateStatus: UpdateTaskStatus = {
      id: draggableId,
      body: {
        statusId: StatusValues[destinationStatus as Status],
      },
    };

    if (
      (sourceStatus === Status.Backlog &&
        destinationStatus === Status.OnHold) ||
      (sourceStatus === Status.OnHold && destinationStatus === Status.Backlog)
    ) {
      if (draggableId) {
        updateStatusMutation.mutate(updateStatus, {
          onSuccess: async (data) => {
            if (await data) {
              const result: ForTaskStateChange = {
                type: "change_status",
                status: true,
              };

              setHasTaskStateChange(result);
            }
          },
          onError: (error) => {
            console.log(error);
          },
        });
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
    if (newTask) {
      const result: ForTaskStateChange = {
        type: "create_task",
        task: newTask,
      };

      setHasTaskStateChange(result);
    }
  };

  const handleUpdateTask = (updatedTask: AllTasksResponse): void => {
    if (updatedTask) {
      const result: ForTaskStateChange = {
        type: "update_task",
        task: updatedTask,
      };

      setHasTaskStateChange(result);
    }
  };

  const handleDeleteTask = () => {
    if (selectedTaskForDelete?.id) {
      const { id: taskID } = selectedTaskForDelete;

      deleteMutation.mutate(
        { id: taskID },
        {
          onSuccess: () => {
            const result: ForTaskStateChange = {
              type: "delete_task",
              task: selectedTaskForDelete,
            };

            setHasTaskStateChange(result);
            setSelectedTaskForDelete(null);
          },
          onError: (error) => {
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
          teamId={selectedTeam}
          complexities={complexities}
          functionalities={functionalities}
          tagsOption={tagsOption as SelectObject[]}
          onCreateTask={handleCreateTask}
          onOpenCreateTask={handleCreateModalState}
          onClose={handleCloseCreateModalState}
        />
        <CreateOrUpdateTask
          open={updateModalOpen}
          update
          teamId={selectedTeam}
          complexities={complexities}
          functionalities={functionalities}
          tagsOption={tagsOption as SelectObject[]}
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
    // will update once api is integrated
    if (TEAM_ID.length === 0) {
      return (
        <NoDataContainer>
          <img src={NoTask} alt={t(LocalizationKey.tasks.noTask)} />
          <Typography variant="h5" fontWeight="bold">
            {t(LocalizationKey.tasks.errorMessage.error)}
          </Typography>
          <Typography variant="body2" fontWeight="bold">
            {t(LocalizationKey.tasks.errorMessage.started)}
            <StyledLink
              underline="hover"
              variant="body2"
              fontWeight="bold"
              onClick={() => handleCreateModalState()}
            >
              {t(LocalizationKey.tasks.errorMessage.created)}
            </StyledLink>
          </Typography>
        </NoDataContainer>
      );
    }

    return null;
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <PageContainer>
          <Grid container>
            <Grid item xs={calculateGridSize(Object.values(Status).length)}>
              <Select
                name="teamFilter"
                placeholder={t(LocalizationKey.tasks.teamFilter)}
                options={teams}
                onChange={handleTeamFilter}
                value={selectedTeam}
              />
            </Grid>
          </Grid>

          <StyledDivider />

          <TaskGridContainer
            container
            spacing={1}
            justifyContent="space-between"
          >
            {Object.values(Status).map((status, index) => {
              if (status !== Status.Invalid) {
                return (
                  <StatusContainer
                    key={index}
                    status={status}
                    teamId={selectedTeam}
                    hasTaskStateChange={hasTaskStateChange}
                    resetHasTaskStateChange={resetHasTaskStateChange}
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
