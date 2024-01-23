import React, { useState, useEffect } from "react";

import {
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
  Paper,
} from "@mui/material";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

import CustomButton from "~/components/form/button/CustomButton";
import { TextField, Modal, ConfirmModal } from "~/components";
import { CheckBox } from "~/components/form";
import theme from "~/theme";
import { AllTasksResponse } from "~/api/tasks";

const styles = {
  container: {
    padding: "0px 10px 10px 10px",
  },
  styledTypographyBold: {
    fontWeight: "bold",
  },
  tags: {
    bug: {
      borderRadius: "5px",
      backgroundColor: theme.palette.error.main,
      padding: "2px 8px",
      color: "#FFFFFF",
    },
    needWork: {
      borderRadius: "5px",
      backgroundColor: theme.palette.warning.main,
      padding: "2px 8px",
      color: "#FFFFFF",
    },
  },
};

interface EditTaskProps {
  open: boolean;
  onClose: () => void;
  task: AllTasksResponse | null;
  onSave: (updatedTask: AllTasksResponse) => void;
  name: string;
}

const EditTask: React.FC<EditTaskProps> = ({
  open,
  onClose,
  task,
  onSave,
  name,
}) => {
  const [newTask, setNewTask] = useState<AllTasksResponse | null>(task);
  const [openMarkCompleted, setMarkCompleted] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<{
    name: string;
    comment: string;
  }>({
    name: name,
    comment: "",
  });

  useEffect(() => {
    setNewTask(task);
  }, [task]);

  const handleSaveTask = (): void => {
    if (newTask) {
      onSave(newTask);
      onClose();
    }
  };

  const handleConfirmMarkCompleted: () => void = () => {
    if (newTask) {
      setNewTask({
        ...newTask,
        status: "Completed",
        completionDate: "9/11/2001",
      });
      setMarkCompleted(false);
    }
  };

  const handleCloseMarkCompleted: () => void = () => {
    setMarkCompleted(false);
  };

  const handleAddComment = (): void => {
    if (newTask && newComment.comment.trim() !== "") {
      const updatedComments = [...(newTask.comments || []), newComment];
      setNewTask({ ...newTask, comments: updatedComments });
      setNewComment({ name: name, comment: "" });
    }
  };

  return (
    <>
      <Modal
        open={open}
        title={newTask ? newTask.name : ""}
        maxWidth="sm"
        onClose={onClose}
      >
        <Stack gap={2} style={styles.container}>
          <TextField
            name="desc"
            label="Description"
            fullWidth
            multiline
            readOnly
            rows={4}
            maxRows={4}
            onChange={(e) =>
              newTask && setNewTask({ ...newTask, description: e.target.value })
            }
            value={newTask?.description || ""}
          />
          <Grid container spacing={2} marginBottom={4}>
            {newTask && (
              <Grid item xs={6}>
                <Stack gap={1}>
                  <Typography style={styles.styledTypographyBold}>
                    Functionality
                  </Typography>
                  <Typography>{newTask.functionality.name}</Typography>
                </Stack>
              </Grid>
            )}

            <Grid item xs={6}>
              <Stack gap={1}>
                <Stack direction="row" style={{ cursor: "pointer" }}>
                  <Typography style={styles.styledTypographyBold}>
                    Complexity
                  </Typography>
                </Stack>
                <Typography>
                  {newTask ? newTask.complexity?.name : ""}
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={6}>
              <Stack gap={1}>
                <Typography style={styles.styledTypographyBold}>
                  Date Started
                </Typography>
                <Typography>{newTask ? newTask.createdDate : ""}</Typography>
              </Stack>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                visibility: newTask?.status !== "Completed" ? "hidden" : "",
              }}
            >
              <Stack gap={1}>
                <Typography style={styles.styledTypographyBold}>
                  Date Completed
                </Typography>
                <Typography>{newTask ? newTask.completionDate : ""}</Typography>
              </Stack>
            </Grid>

            <Grid item xs={6}>
              <Stack gap={1}>
                <Typography style={styles.styledTypographyBold}>
                  Sprint
                </Typography>
                <Typography>Sprint #{newTask ? newTask.sprint : ""}</Typography>
              </Stack>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                visibility: newTask?.status !== "In Progress" ? "hidden" : "",
              }}
            >
              <CheckBox
                name="markAsCompleted"
                label="Mark as Complete"
                checked={openMarkCompleted}
                onClick={() => setMarkCompleted(true)}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography style={styles.styledTypographyBold}>Tags</Typography>

              <Stack direction="row" gap={0.5} flexWrap="wrap">
                <Box style={styles.tags.bug}>Bug</Box>
                <Box style={styles.tags.needWork}>Needs Work</Box>
              </Stack>
            </Grid>
          </Grid>

          <Typography style={styles.styledTypographyBold}>Comments</Typography>
          <Divider />

          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <Avatar alt="User Avatar" />
            </Grid>
            <Grid item style={{ flex: 1 }}>
              <TextField
                name="commentInput"
                fullWidth
                multiline
                rows={4}
                maxRows={4}
                style={{ backgroundColor: "#EAF3F4" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Send"
                        edge="end"
                        onClick={handleAddComment}
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
          {newTask?.comments &&
            newTask.comments.map((comment) => {
              return (
                <Grid container spacing={1} alignItems="center" marginTop={0.5}>
                  <Grid item>
                    <Avatar alt="User Avatar" />
                  </Grid>
                  <Grid item xs={8}>
                    <Paper
                      elevation={0}
                      variant="outlined"
                      style={{
                        padding: "10px",
                        backgroundColor: "#EAF3F4",
                      }}
                    >
                      <Typography variant="subtitle1">
                        {comment.name}
                      </Typography>
                      <Typography variant="body1">{comment.comment}</Typography>
                    </Paper>
                  </Grid>
                </Grid>
              );
            })}
          <Stack
            direction="row"
            display="flex"
            justifyContent="flex-end"
            gap={1}
          >
            <CustomButton
              type="button"
              colorVariant="neutral"
              variant="contained"
              onClick={handleSaveTask}
            >
              Back
            </CustomButton>
          </Stack>
        </Stack>
      </Modal>
      <ConfirmModal
        open={openMarkCompleted}
        maxWidth="md"
        onConfirm={handleConfirmMarkCompleted}
        confirmLabel={"Yes, Please"}
        onClose={handleCloseMarkCompleted}
        message={"Are you sure you want to tag this task as completed?"}
        closeLabel={"No, Thanks"}
      />
    </>
  );
};

export default EditTask;
