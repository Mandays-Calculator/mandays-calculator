import type { AllTasksResponse, Comment } from '~/api/tasks'

import React, { useState, useEffect } from 'react'

import SendOutlinedIcon from '@mui/icons-material/SendOutlined'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import CloseIcon from '@mui/icons-material/Close'
import LocalizationKey from '~/i18n/key/index.ts'
import { useTranslation } from 'react-i18next'
import {
  AccordionDetails,
  AccordionSummary,
  InputAdornment,
  IconButton,
  Typography,
  Accordion,
  Avatar,
  Grid,
  Box
} from '@mui/material'

import { TextField, Modal, ConfirmModal } from '~/components'
import { CheckBox } from '~/components/form'
import theme from '~/theme'
import moment from 'moment'

import { Status } from './utils'
import { style as viewTaskDetailsStyle } from './style.ts'

const styles = {
  container: {
    padding: '0px 10px 10px 10px'
  },
  styledTypographyBold: {
    fontWeight: 'bold'
  },
  tags: {
    bug: {
      borderRadius: '5px',
      backgroundColor: theme.palette.error.main,
      padding: '2px 8px',
      color: '#FFFFFF'
    },
    needWork: {
      borderRadius: '5px',
      backgroundColor: theme.palette.warning.main,
      padding: '2px 8px',
      color: '#FFFFFF'
    }
  }
}

interface ViewTaskDetailsProps {
  open: boolean
  onClose: () => void
  task: AllTasksResponse | null
  onSave: (updatedTask: AllTasksResponse) => void
  name: string
}

const ViewTaskDetails: React.FC<ViewTaskDetailsProps> = ({
  open,
  onClose,
  task,
  onSave,
  name
}) => {
  const defaultComment = {
    name: name,
    comment: ''
  }
  const { t } = useTranslation()

  const [currentTask, setNewTask] = useState<AllTasksResponse | null>(task)
  const [openMarkCompleted, setMarkCompleted] = useState<boolean>(false)
  const [newComment, setNewComment] = useState<Comment>(defaultComment)

  useEffect(() => {
    setNewTask(task)
  }, [task])

  const handleSaveTask = (): void => {
    if (currentTask) {
      onSave(currentTask)
      onClose()
    }
  }

  const handleConfirmMarkCompleted: () => void = () => {
    if (currentTask) {
      setNewTask({
        ...currentTask,
        status: Status.Completed,
        completionDate: moment().format('L')
      })
      setMarkCompleted(false)
    }
  }

  const handleCloseMarkCompleted: () => void = () => {
    setMarkCompleted(false)
  }

  const handleAddComment = (): void => {
    if (currentTask && newComment.comment.trim() !== '') {
      const updatedComments = [...(currentTask?.comments || []), newComment]
      setNewTask({ ...currentTask, comments: updatedComments })
      setNewComment(defaultComment)
    }
  }

  return (
    <>
      <Modal open={open} title={currentTask?.name} maxWidth='sm' onClose={onClose}>
        <Box sx={viewTaskDetailsStyle.modalCloseButton}>
          <IconButton onClick={handleSaveTask}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Grid container sx={viewTaskDetailsStyle.modalContainer}>
          <Grid item xs={12}>
            <TextField
              name='taskDescription'
              label={t(LocalizationKey.tasks.viewTaskDetails.label.description)}
              placeholder={t(
                LocalizationKey.tasks.viewTaskDetails.placeholder.description
              )}
              fullWidth
              multiline
              readOnly
              onChange={e =>
                currentTask &&
                setNewTask({ ...currentTask, description: e.target.value })
              }
              value={currentTask?.description || ''}
            />
          </Grid>

          <Grid item container xs={12}>
            <Grid item xs={12} sm={6}>
              <Typography>
                {t(LocalizationKey.tasks.viewTaskDetails.label.functionality)}
              </Typography>
              <Typography>{currentTask?.functionality?.name}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>
                {t(LocalizationKey.tasks.viewTaskDetails.label.complexity)}
              </Typography>
              <Typography>{currentTask?.complexity?.name}</Typography>
            </Grid>
          </Grid>

          <Grid item container xs={12}>
            <Grid item xs={12} sm={6}>
              <Typography>
                {t(LocalizationKey.tasks.viewTaskDetails.label.createdDate)}
              </Typography>
              <Typography>{currentTask?.createdDate}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              {currentTask?.status === Status.Completed ? (
                <>
                  <Typography>
                    {t(
                      LocalizationKey.tasks.viewTaskDetails.label.completionDate
                    )}
                  </Typography>
                  <Typography>{currentTask?.completionDate}</Typography>
                </>
              ) : null}
              {currentTask?.status === Status.InProgress ? (
                <CheckBox
                  label={t(
                    LocalizationKey.tasks.viewTaskDetails.label.markComplete
                  )}
                  checked={openMarkCompleted}
                  onClick={() => setMarkCompleted(true)}
                />
              ) : null}
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Typography>
              {t(LocalizationKey.tasks.viewTaskDetails.label.sprint)}
            </Typography>
            <Typography>
              {t(LocalizationKey.tasks.viewTaskDetails.placeholder.sprint)}
              {currentTask?.sprint}
            </Typography>
          </Grid>

          <Grid item container xs={12} spacing={1}>
            <Grid item xs={12}>
              <Typography>
                {t(LocalizationKey.tasks.viewTaskDetails.label.tags)}
              </Typography>
            </Grid>
            {(currentTask?.tags || []).map((tag, index) => (
              <Grid item>
                <Box key={index}>{tag.value}</Box>
              </Grid>
            ))}
          </Grid>

          <Accordion defaultExpanded sx={{ width: '100%' }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='taskdetails-comment-panel'
              id='taskdetails-comment-panel-header'
            >
              {t(LocalizationKey.tasks.viewTaskDetails.label.comments)}
            </AccordionSummary>
            <AccordionDetails>
              <Grid item container alignItems='center' xs={12}>
                <Grid item xs={2} sm={1}>
                  <Avatar alt='User Avatar' />
                </Grid>

                <Grid item xs={10} sm={11}>
                  <TextField
                    name='comment'
                    placeholder={t(
                      LocalizationKey.tasks.viewTaskDetails.placeholder.comments
                    )}
                    fullWidth
                    multiline
                    maxRows={10}
                    sx={{ backgroundColor: '#EAF3F4' }}
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
                      )
                    }}
                    value={newComment.comment}
                    onChange={e =>
                      setNewComment({ ...newComment, comment: e.target.value })
                    }
                  />
                </Grid>
              </Grid>

              <Grid item container alignItems='center' xs={12}>
                {(currentTask?.comments || []).map((comment, index) => (
                  <>
                    <Grid item xs={2} sm={1}>
                      <Avatar
                        alt={
                          t(
                            LocalizationKey.tasks.viewTaskDetails.label.comments
                          ) + (comment?.name ? comment.name : 'a user')
                        }
                      />
                    </Grid>

                    <Grid item xs={10} sm={11}>
                      <Box key={index}>
                        <Typography>{comment?.name}</Typography>
                        <Typography>{comment?.comment}</Typography>
                      </Box>
                    </Grid>
                  </>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Modal>

      <ConfirmModal
        open={openMarkCompleted}
        onConfirm={handleConfirmMarkCompleted}
        confirmLabel={'Yes, Please'}
        onClose={handleCloseMarkCompleted}
        message={'Are you sure you want to tag this task as completed?'}
        closeLabel={'No, Thanks'}
      />
    </>
  )
}

export default ViewTaskDetails
