import type {
  ForTaskStateChange,
  AllTasksResponse,
  UpdateTaskStatus,
  Comment,
} from "~/api/tasks";
import type { User } from "~/api/user/types.ts";
import type { ReactElement } from "react";

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import LocalizationKey from "~/i18n/key/index.ts";
import moment from "moment";
import {
  InputAdornment,
  IconButton,
  Typography,
  Avatar,
  Grid,
} from "@mui/material";

import { Modal, ConfirmModal } from "~/components";
import { CheckBox } from "~/components/form";

import {
  ViewTaskDetailsContainer,
  ViewCommentContainerBox,
  AccordionCommentDetails,
  AccordionCommentTitle,
  ViewTaskDetailsLabel,
  AccordionComment,
  styledScrollbar,
  CloseContainer,
  CommentTexbox,
  TaskTags,
} from "./style.ts";
import { Status, StatusValues } from "./utils";
import { useComments, useUpdateTaskStatus } from "~/queries/tasks/Tasks.ts";

interface ViewTaskDetailsProps {
  open: boolean;
  userDetails: User | null;
  task: AllTasksResponse | null;
  handleHasTaskStateChange: (result: ForTaskStateChange) => void;
  onClose: () => void;
}

const ViewTaskDetails = (props: ViewTaskDetailsProps): ReactElement => {
  const { open, userDetails, task, handleHasTaskStateChange, onClose } = props;
  const { t } = useTranslation();

  const defaultComment: Comment = {
    task: task,
    user: userDetails,
    description: "",
  };

  const [currentTask, setCurrentTask] = useState<AllTasksResponse | null>(task);
  const [openMarkCompleted, setOpenMarkCompleted] = useState<boolean>(false);
  const [newlyMarkCompleted, setNewlyMarkCompleted] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<Comment>(defaultComment);

  const updateStatusMutation = useUpdateTaskStatus();

  useEffect(() => {
    setCurrentTask(task);
  }, [task]);

  const getComments = useComments();

  console.log(getComments);

  const handleCloseViewTaskDetails = (): void => {
    setNewComment(defaultComment);
    onClose();

    if (newlyMarkCompleted) {
      const result: ForTaskStateChange = {
        type: "mark_completed",
        status: true,
      };

      handleHasTaskStateChange(result);
      setNewlyMarkCompleted(false);
    }
  };

  const handleConfirmMarkCompleted: () => void = () => {
    if (currentTask && currentTask?.id) {
      const updateStatus: UpdateTaskStatus = {
        id: currentTask?.id,
        body: {
          statusId: StatusValues[Status.Completed],
        },
      };

      updateStatusMutation.mutate(updateStatus, {
        onSuccess: async data => {
          if (await data) {
            setCurrentTask({
              ...currentTask,
              status: Status.Completed,
              completionDate: moment().format("L"),
            });

            setNewlyMarkCompleted(true);
            setOpenMarkCompleted(false);
          }
        },
        onError: error => {
          console.log(error);
        },
      });
    }
  };

  const handleCloseMarkCompleted: () => void = () => {
    setOpenMarkCompleted(false);
  };

  const handleAddComment = (): void => {
    if (currentTask && newComment.description.trim() !== "") {
      const updatedComments = [...(currentTask?.comments || []), newComment];
      setCurrentTask({ ...currentTask, comments: updatedComments });
      setNewComment(defaultComment);
    }
  };

  const getAvatarAlt = (username: User | null): string => {
    let altText = t(LocalizationKey.tasks.viewTaskDetails.placeholder.avatar);

    if (username) {
      altText += `${username?.firstName} ${username?.lastName}`;
    } else {
      altText += t(LocalizationKey.tasks.viewTaskDetails.placeholder.user);
    }

    return altText;
  };

  const renderCommentSection = () => {
    return (
      <AccordionComment defaultExpanded square>
        <AccordionCommentTitle
          expandIcon={<ExpandMoreIcon />}
          aria-controls='taskdetails-comment-panel'
          id='taskdetails-comment-panel-header'
        >
          {t(LocalizationKey.tasks.viewTaskDetails.label.comments)}
        </AccordionCommentTitle>
        <AccordionCommentDetails>
          <ViewTaskDetailsContainer
            item
            container
            type='comment'
            alignItems='center'
            xs={12}
          >
            <Grid item xs={2} sm={1}>
              <Avatar alt={getAvatarAlt(userDetails)} />
            </Grid>

            <Grid item xs={10} sm={11}>
              <CommentTexbox
                name='comment'
                placeholder={t(
                  LocalizationKey.tasks.viewTaskDetails.placeholder.comments,
                )}
                fullWidth
                multiline
                maxRows={10}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='Send'
                        edge='end'
                        onClick={() => handleAddComment()}
                      >
                        <SendOutlinedIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                value={newComment.description}
                onChange={e =>
                  setNewComment({ ...newComment, description: e.target.value })
                }
              />
            </Grid>
          </ViewTaskDetailsContainer>

          <Grid item container alignItems='center' xs={12} spacing={1.5}>
            {(currentTask?.comments || []).map((comment, index) => (
              <React.Fragment key={comment.id || index}>
                <Grid item xs={2} sm={1}>
                  <Avatar alt={getAvatarAlt(comment?.user)} />
                </Grid>

                <Grid item container xs={10} sm={11} alignItems='center'>
                  <ViewCommentContainerBox key={index}>
                    <ViewTaskDetailsLabel>{`${comment?.user?.firstName} ${comment?.user?.lastName}`}</ViewTaskDetailsLabel>
                    <Typography>{comment?.description}</Typography>
                  </ViewCommentContainerBox>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </AccordionCommentDetails>
      </AccordionComment>
    );
  };

  return (
    <>
      <Modal
        open={open}
        title={currentTask?.name}
        maxWidth='sm'
        onClose={handleCloseViewTaskDetails}
        sx={styledScrollbar}
      >
        <CloseContainer>
          <IconButton onClick={() => handleCloseViewTaskDetails()}>
            <CloseIcon />
          </IconButton>
        </CloseContainer>

        <ViewTaskDetailsContainer container spacing={1} type='outer'>
          <Grid item xs={12}>
            <ViewTaskDetailsLabel>
              {t(LocalizationKey.tasks.viewTaskDetails.label.description)}
            </ViewTaskDetailsLabel>
            <Typography>{currentTask?.description || ""}</Typography>
          </Grid>

          <ViewTaskDetailsContainer item container type='inner' xs={12}>
            <Grid item xs={12} sm={6}>
              <ViewTaskDetailsLabel>
                {t(LocalizationKey.tasks.viewTaskDetails.label.functionality)}
              </ViewTaskDetailsLabel>
              <Typography>{currentTask?.functionality?.name || ""}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <ViewTaskDetailsLabel>
                {t(LocalizationKey.tasks.viewTaskDetails.label.complexity)}
              </ViewTaskDetailsLabel>
              <Typography>{currentTask?.complexity?.name || ""}</Typography>
            </Grid>
          </ViewTaskDetailsContainer>

          <ViewTaskDetailsContainer item container type='inner' xs={12}>
            <Grid item xs={12} sm={6}>
              <ViewTaskDetailsLabel>
                {t(LocalizationKey.tasks.viewTaskDetails.label.createdDate)}
              </ViewTaskDetailsLabel>
              <Typography>
                {currentTask?.createdDate
                  ? moment(currentTask.createdDate).format("L")
                  : ""}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              {currentTask?.status === Status.Completed ? (
                <>
                  <ViewTaskDetailsLabel>
                    {t(
                      LocalizationKey.tasks.viewTaskDetails.label
                        .completionDate,
                    )}
                  </ViewTaskDetailsLabel>
                  <Typography>
                    {currentTask?.completionDate
                      ? moment(currentTask.completionDate).format("L")
                      : ""}
                  </Typography>
                </>
              ) : null}
              {currentTask?.status === Status.InProgress ? (
                <CheckBox
                  label={t(
                    LocalizationKey.tasks.viewTaskDetails.label.markComplete,
                  )}
                  checked={openMarkCompleted}
                  onClick={() => setOpenMarkCompleted(true)}
                />
              ) : null}
            </Grid>
          </ViewTaskDetailsContainer>

          <ViewTaskDetailsContainer item type='inner' xs={12}>
            <ViewTaskDetailsLabel>
              {t(LocalizationKey.tasks.viewTaskDetails.label.sprint)}
            </ViewTaskDetailsLabel>
            <Typography>
              {t(LocalizationKey.tasks.viewTaskDetails.placeholder.sprint)}
              {currentTask?.sprint || ""}
            </Typography>
          </ViewTaskDetailsContainer>

          <ViewTaskDetailsContainer
            item
            container
            type='inner'
            xs={12}
            spacing={1}
          >
            <Grid item xs={12}>
              <ViewTaskDetailsLabel>
                {t(LocalizationKey.tasks.viewTaskDetails.label.tags)}
              </ViewTaskDetailsLabel>
            </Grid>
            {(currentTask?.tags ?? []).map((tag, index) => (
              <React.Fragment key={tag?.id || index}>
                <Grid item>
                  <TaskTags status={tag?.name} key={index}>
                    {tag?.name}
                  </TaskTags>
                </Grid>
              </React.Fragment>
            ))}
          </ViewTaskDetailsContainer>

          {renderCommentSection()}
        </ViewTaskDetailsContainer>
      </Modal>

      <ConfirmModal
        open={openMarkCompleted}
        onConfirm={handleConfirmMarkCompleted}
        confirmLabel={t(
          LocalizationKey.tasks.viewTaskDetails.modal.confirmMarkComplete,
        )}
        onClose={handleCloseMarkCompleted}
        message={t(LocalizationKey.tasks.viewTaskDetails.modal.markComplete)}
        closeLabel={t(
          LocalizationKey.tasks.viewTaskDetails.modal.closeMarkComplete,
        )}
      />
    </>
  );
};

export default ViewTaskDetails;
