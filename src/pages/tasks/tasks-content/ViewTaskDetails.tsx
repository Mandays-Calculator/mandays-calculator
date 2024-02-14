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
  AccordionDetails,
  AccordionSummary,
  InputAdornment,
  IconButton,
  Typography,
  Accordion,
  Avatar,
  Grid,
  Box,
} from "@mui/material";

import { TextField, Modal, ConfirmModal } from "~/components";
import { CheckBox } from "~/components/form";

import { viewTaskDetailsStyles, getTagStyle, taskStyles } from "./style.ts";
import { Status } from "./utils";

interface ViewTaskDetailsProps {
  open: boolean;
  username: string;
  task: AllTasksResponse | null;
  onSave: (updatedTask: AllTasksResponse) => void;
  onClose: () => void;
}

const ViewTaskDetails = (props: ViewTaskDetailsProps): ReactElement => {
  const { open, username, task, onClose } = props;
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
      <Accordion
        defaultExpanded
        square
        sx={viewTaskDetailsStyles.comment.accordion}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="taskdetails-comment-panel"
          id="taskdetails-comment-panel-header"
          sx={viewTaskDetailsStyles.label}
        >
          {t(LocalizationKey.tasks.viewTaskDetails.label.comments)}
        </AccordionSummary>
        <AccordionDetails>
          <Grid
            item
            container
            alignItems="center"
            xs={12}
            sx={viewTaskDetailsStyles.comment.container}
          >
            <Grid item xs={2} sm={1}>
              <Avatar alt={getAvatarAlt(username)} />
            </Grid>

            <Grid item xs={10} sm={11}>
              <TextField
                name="comment"
                placeholder={t(
                  LocalizationKey.tasks.viewTaskDetails.placeholder.comments,
                )}
                fullWidth
                multiline
                maxRows={10}
                sx={viewTaskDetailsStyles.comment.textbox}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Send"
                        edge="end"
                        onClick={() => handleAddComment()}
                      >
                        <SendOutlinedIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                value={newComment.comment}
                onChange={(e) =>
                  setNewComment({ ...newComment, comment: e.target.value })
                }
              />
            </Grid>
          </Grid>

          <Grid item container alignItems="center" xs={12} spacing={1.5}>
            {(currentTask?.comments || []).map((comment, index) => (
              <>
                <Grid item xs={2} sm={1}>
                  <Avatar alt={getAvatarAlt(comment?.name)} />
                </Grid>

                <Grid item container xs={10} sm={11} alignItems="center">
                  <Box key={index} sx={viewTaskDetailsStyles.comment.comment}>
                    <Typography sx={viewTaskDetailsStyles.label}>
                      {comment?.name}
                    </Typography>
                    <Typography>{comment?.comment}</Typography>
                  </Box>
                </Grid>
              </>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
    );
  };

  return (
    <>
      <Modal
        open={open}
        title={currentTask?.name}
        maxWidth="sm"
        onClose={onClose}
        sx={taskStyles.scrollbar}
      >
        <Box sx={taskStyles.modal.close}>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Grid container sx={viewTaskDetailsStyles.modal.container}>
          <Grid item xs={12}>
            <Typography sx={viewTaskDetailsStyles.label}>
              {t(LocalizationKey.tasks.viewTaskDetails.label.description)}
            </Typography>
            <Typography>{currentTask?.description}</Typography>
          </Grid>

          <Grid
            item
            container
            xs={12}
            sx={viewTaskDetailsStyles.taskViewDetails}
          >
            <Grid item xs={12} sm={6}>
              <Typography sx={viewTaskDetailsStyles.label}>
                {t(LocalizationKey.tasks.viewTaskDetails.label.functionality)}
              </Typography>
              <Typography>{currentTask?.functionality?.name}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={viewTaskDetailsStyles.label}>
                {t(LocalizationKey.tasks.viewTaskDetails.label.complexity)}
              </Typography>
              <Typography>{currentTask?.complexity?.name}</Typography>
            </Grid>
          </Grid>

          <Grid
            item
            container
            xs={12}
            sx={viewTaskDetailsStyles.taskViewDetails}
          >
            <Grid item xs={12} sm={6}>
              <Typography sx={viewTaskDetailsStyles.label}>
                {t(LocalizationKey.tasks.viewTaskDetails.label.createdDate)}
              </Typography>
              <Typography>{currentTask?.createdDate}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              {currentTask?.status === Status.Completed ? (
                <>
                  <Typography sx={viewTaskDetailsStyles.label}>
                    {t(
                      LocalizationKey.tasks.viewTaskDetails.label
                        .completionDate,
                    )}
                  </Typography>
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
          </Grid>

          <Grid item xs={12} sx={viewTaskDetailsStyles.taskViewDetails}>
            <Typography sx={viewTaskDetailsStyles.label}>
              {t(LocalizationKey.tasks.viewTaskDetails.label.sprint)}
            </Typography>
            <Typography>
              {t(LocalizationKey.tasks.viewTaskDetails.placeholder.sprint)}
              {currentTask?.sprint}
            </Typography>
          </Grid>

          <Grid
            item
            container
            xs={12}
            spacing={1}
            sx={viewTaskDetailsStyles.taskViewDetails}
          >
            <Grid item xs={12}>
              <Typography sx={viewTaskDetailsStyles.label}>
                {t(LocalizationKey.tasks.viewTaskDetails.label.tags)}
              </Typography>
            </Grid>
            {(currentTask?.tags ?? []).map((tag, index) => (
              <Grid item>
                <Box sx={getTagStyle(tag?.value)} key={index}>
                  {tag?.value}
                </Box>
              </Grid>
            ))}
          </Grid>

          {renderCommentSection()}
        </Grid>
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
