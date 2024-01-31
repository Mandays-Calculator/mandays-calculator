import type { AllTasksResponse, Comment } from "~/api/tasks";
import type { ReactElement } from "react";

import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

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

import { TextField, Modal, ConfirmModal } from "~/components";
import { CheckBox } from "~/components/form";

import {
  ViewTaskDetailsInnerContainer,
  ViewCommentContainerGrid,
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
import { Status } from "./utils";

interface ViewTaskDetailsProps {
  open: boolean;
  username: string;
  task: AllTasksResponse | null;
  onSave: (updatedTask: AllTasksResponse) => void;
  onClose: () => void;
}

const ViewTaskDetails = (props: ViewTaskDetailsProps): ReactElement => {
  const { open, username, task, onSave, onClose } = props;
  const { t } = useTranslation();

  const defaultComment = {
    name: username,
    comment: "",
  };

  const [currentTask, setNewTask] = useState<AllTasksResponse | null>(task);
  const [openMarkCompleted, setMarkCompleted] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<Comment>(defaultComment);

  useEffect(() => {
    setNewTask(task);
  }, [task]);

  const handleSaveTask = (): void => {
    if (currentTask) {
      onSave(currentTask);
      setNewComment(defaultComment);
      onClose();
    }
  };

  const handleConfirmMarkCompleted: () => void = () => {
    if (currentTask) {
      setNewTask({
        ...currentTask,
        status: Status.Completed,
        completionDate: moment().format("L"),
      });
      setMarkCompleted(false);
    }
  };

  const handleCloseMarkCompleted: () => void = () => {
    setMarkCompleted(false);
  };

  const handleAddComment = (): void => {
    if (currentTask && newComment.comment.trim() !== "") {
      const updatedComments = [...(currentTask?.comments || []), newComment];
      setNewTask({ ...currentTask, comments: updatedComments });
      setNewComment(defaultComment);
    }
  };

  const getAvatarAlt = (username: string): string => {
    let altText = t(LocalizationKey.tasks.viewTaskDetails.placeholder.avatar);

    if (username) {
      altText += username;
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
          <ViewCommentContainerGrid item container alignItems='center' xs={12}>
            <Grid item xs={2} sm={1}>
              <Avatar alt={getAvatarAlt(username)} />
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
                value={newComment.comment}
                onChange={e =>
                  setNewComment({ ...newComment, comment: e.target.value })
                }
              />
            </Grid>
          </ViewCommentContainerGrid>

          <Grid item container alignItems='center' xs={12} spacing={1.5}>
            {(currentTask?.comments || []).map((comment, index) => (
              <>
                <Grid item xs={2} sm={1}>
                  <Avatar alt={getAvatarAlt(comment?.name)} />
                </Grid>

                <Grid item container xs={10} sm={11} alignItems='center'>
                  <ViewCommentContainerBox key={index}>
                    <ViewTaskDetailsLabel>{comment?.name}</ViewTaskDetailsLabel>
                    <Typography>{comment?.comment}</Typography>
                  </ViewCommentContainerBox>
                </Grid>
              </>
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
        onClose={onClose}
        sx={styledScrollbar}
      >
        <CloseContainer>
          <IconButton onClick={handleSaveTask}>
            <CloseIcon />
          </IconButton>
        </CloseContainer>

        <ViewTaskDetailsContainer container>
          <Grid item xs={12}>
            <TextField
              name='taskDescription'
              label={t(LocalizationKey.tasks.viewTaskDetails.label.description)}
              placeholder={t(
                LocalizationKey.tasks.viewTaskDetails.placeholder.description,
              )}
              fullWidth
              multiline
              onChange={e =>
                currentTask &&
                setNewTask({ ...currentTask, description: e.target.value })
              }
              value={currentTask?.description || ""}
            />
          </Grid>

          <ViewTaskDetailsInnerContainer item container xs={12}>
            <Grid item xs={12} sm={6}>
              <ViewTaskDetailsLabel>
                {t(LocalizationKey.tasks.viewTaskDetails.label.functionality)}
              </ViewTaskDetailsLabel>
              <Typography>{currentTask?.functionality?.name}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <ViewTaskDetailsLabel>
                {t(LocalizationKey.tasks.viewTaskDetails.label.complexity)}
              </ViewTaskDetailsLabel>
              <Typography>{currentTask?.complexity?.name}</Typography>
            </Grid>
          </ViewTaskDetailsInnerContainer>

          <ViewTaskDetailsInnerContainer item container xs={12}>
            <Grid item xs={12} sm={6}>
              <ViewTaskDetailsLabel>
                {t(LocalizationKey.tasks.viewTaskDetails.label.createdDate)}
              </ViewTaskDetailsLabel>
              <Typography>{currentTask?.createdDate}</Typography>
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
                  <Typography>{currentTask?.completionDate}</Typography>
                </>
              ) : null}
              {currentTask?.status === Status.InProgress ? (
                <CheckBox
                  label={t(
                    LocalizationKey.tasks.viewTaskDetails.label.markComplete,
                  )}
                  checked={openMarkCompleted}
                  onClick={() => setMarkCompleted(true)}
                />
              ) : null}
            </Grid>
          </ViewTaskDetailsInnerContainer>

          <ViewTaskDetailsInnerContainer item xs={12}>
            <ViewTaskDetailsLabel>
              {t(LocalizationKey.tasks.viewTaskDetails.label.sprint)}
            </ViewTaskDetailsLabel>
            <Typography>
              {t(LocalizationKey.tasks.viewTaskDetails.placeholder.sprint)}
              {currentTask?.sprint}
            </Typography>
          </ViewTaskDetailsInnerContainer>

          <ViewTaskDetailsInnerContainer item container xs={12} spacing={1}>
            <Grid item xs={12}>
              <ViewTaskDetailsLabel>
                {t(LocalizationKey.tasks.viewTaskDetails.label.tags)}
              </ViewTaskDetailsLabel>
            </Grid>
            {(currentTask?.tags ?? []).map((tag, index) => (
              <Grid item>
                <TaskTags status={tag?.value} key={index}>
                  {tag?.value}
                </TaskTags>
              </Grid>
            ))}
          </ViewTaskDetailsInnerContainer>

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
