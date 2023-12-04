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

import { TextField, Modal } from "~/components";
import CustomButton from "~/components/form/button/CustomButton";

interface Task {
  taskTitle: string;
  desc: string;
  date: string;
  sprint: string;
  complexity: string;
  status: string;
  type: string;
  functionality: string;
}

interface EditTaskProps {
  open: boolean;
  onClose: () => void;
  task: Task | null;
}

const EditTask: React.FC<EditTaskProps> = ({ open, onClose, task }) => {
  const [newTask, setNewTask] = useState<Task | null>(task);

  useEffect(() => {
    setNewTask(task);
  }, [task]);
  const handleCreateTask = (): void => {
    setNewTask({
      taskTitle: "",
      desc: "",
      date: "",
      sprint: "",
      complexity: "",
      status: "Backlog",
      type: "",
      functionality: "",
    });
    onClose();
  };

  return (
    <>
      <Modal
        open={open}
        title={newTask ? newTask.taskTitle : ""}
        maxWidth="sm"
        onClose={onClose}
      >
        <div style={{ padding: "0px 10px 10px 10px" }}>
          <Stack gap={2}>
            <TextField
              name="desc"
              label="Description"
              fullWidth
              multiline
              rows={4}
              maxRows={4}
              onChange={(e) =>
                newTask && setNewTask({ ...newTask, desc: e.target.value })
              }
              value={newTask?.desc || ""}
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Stack gap={1}>
                  <Typography sx={{ fontWeight: "bold" }}>
                    Functionality
                  </Typography>
                  <Typography>
                    {newTask ? newTask.functionality : ""}
                  </Typography>
                </Stack>
              </Grid>

              <Grid item xs={6}>
                <Stack gap={1}>
                  <Stack direction="row" spacing={1} sx={{ cursor: "pointer" }}>
                    <Typography sx={{ fontWeight: "bold" }}>
                      Complexity
                    </Typography>
                  </Stack>
                  <Typography>{newTask ? newTask.complexity : ""}</Typography>
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack gap={1}>
                  <Typography sx={{ fontWeight: "bold" }}>
                    Date Started
                  </Typography>
                  <Typography>{newTask ? newTask.date : ""}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack gap={1}>
                  <Typography sx={{ fontWeight: "bold" }}>Sprint</Typography>
                  <Typography>
                    Sprint #{newTask ? newTask.sprint : ""}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Typography sx={{ fontWeight: "bold" }}>Tags</Typography>
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  flexWrap="wrap"
                >
                  <Stack direction="row" gap={0.5}>
                    <Box
                      sx={{
                        borderRadius: "5px",
                        bgcolor: "error.main",
                        padding: "2px 8px",
                        color: "#FFFFFF",
                      }}
                    >
                      Bug
                    </Box>
                    <Box
                      sx={{
                        borderRadius: "5px",
                        bgcolor: "warning.main",
                        padding: "2px 8px",
                      }}
                    >
                      <Box sx={{ color: "#FFFFFF" }}>Needs Work</Box>
                    </Box>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
            <br />
            <Typography sx={{ fontWeight: "bold" }}>Comments</Typography>
            <Divider />
            <div>
              <Grid container spacing={1} alignItems="center">
                <Grid item>
                  <Avatar alt="User Avatar" />
                </Grid>
                <Grid item sx={{ flex: 1 }}>
                  <TextField
                    name="commentInput"
                    fullWidth
                    multiline
                    rows={4}
                    maxRows={4}
                    sx={{ backgroundColor: "#EAF3F4" }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton aria-label="Send" edge="end">
                            <SendOutlinedIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              <div style={{ marginTop: 15 }}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <Avatar alt="User Avatar" />
                  </Grid>
                  <Grid item xs={8}>
                    <Paper
                      elevation={0}
                      variant="outlined"
                      sx={{ padding: "10px", backgroundColor: "#EAF3F4" }}
                    >
                      <Typography variant="subtitle1">John Doe</Typography>
                      <Typography variant="body1">
                        Acknowledge. Will start reviewing this task.
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </div>
            </div>
            <Stack
              direction="row"
              display="flex"
              justifyContent="flex-end"
              gap={1}
            >
              <CustomButton
                type="button"
                colorVariant="neutral"
                onClick={handleCreateTask}
              >
                Back
              </CustomButton>
            </Stack>
          </Stack>
        </div>
      </Modal>
    </>
  );
};

export default EditTask;
