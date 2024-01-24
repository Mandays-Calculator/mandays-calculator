import type { AllTasksResponse } from '~/api/tasks/types'

import { ReactElement } from 'react'

import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { Box, Grid, Paper, Typography } from '@mui/material'
import EventIcon from '@mui/icons-material/Event'
import { useTranslation } from 'react-i18next'
import LocalizationKey from '~/i18n/key'

import theme from '~/theme'

import { Status } from '../utils'

interface TaskDetailsCardProps {
  data: AllTasksResponse
  handleEdit: (task: AllTasksResponse) => void
  handleViewDetails: (task: AllTasksResponse) => void
  onDelete: (task: AllTasksResponse) => void
}

const taskDetailsCardStyles = {
  title: { fontSize: '1.2em', fontWeight: 'bold' },
  description: {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    WebkitLineClamp: 3
  },
  completionDate: { display: 'flex', alignItems: 'center' },
  completionDateIcon: { marginRight: '5px' },
  comments: {
    borderRadius: '5px',
    backgroundColor: '#dedede',
    padding: '2px 3px'
  },
  tag: {
    bug: {
      backgroundColor: theme.palette.error.main,
      borderRadius: '5px',
      padding: '2px 3px',
      color: '#FFFFFF'
    },
    needsWork: {
      backgroundColor: theme.palette.warning.main,
      borderRadius: '5px',
      padding: '2px 3px',
      color: '#FFFFFF'
    }
  }
}

const getTagStyle = (value: string) => {
  if (typeof value === 'string' && value === 'Bug') {
    return taskDetailsCardStyles.tag.bug
  }

  return taskDetailsCardStyles.tag.needsWork
}

const checkIfButtonsAreShown = (status: string) => {
  if (status !== Status.OnHold && status !== Status.Backlog) {
    return { display: 'none', cursor: 'pointer' }
  }

  return { cursor: 'pointer' }
}

const TaskDetailsCard = ({
  data,
  handleEdit,
  handleViewDetails,
  onDelete
}: TaskDetailsCardProps): ReactElement => {
  const { t } = useTranslation()

  return (
    <Paper
      elevation={2}
      sx={{ marginTop: 2, padding: 1.5 }}
      onClick={() => handleViewDetails(data)}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography sx={taskDetailsCardStyles.title}>{data?.name}</Typography>
        </Grid>

        <Grid item xs={12} sx={taskDetailsCardStyles.description}>
          <Typography>{data?.description}</Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography sx={taskDetailsCardStyles.completionDate}>
            <EventIcon sx={taskDetailsCardStyles.completionDateIcon} />
            {data?.completionDate}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography>
            {t(LocalizationKey.tasks.taskDetails.sprint) + data?.sprint}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography>
            {t(LocalizationKey.tasks.taskDetails.complexity) +
              data?.complexity.name}
          </Typography>
        </Grid>

        <Grid
          item
          container
          justifyContent='space-between'
          alignItems='center'
          xs={12}
        >
          <Grid item>
            <Box
              sx={taskDetailsCardStyles.comments}
              display='flex'
              alignItems='center'
            >
              <TextsmsOutlinedIcon />
              {data?.comments?.length}
            </Box>
          </Grid>

          {data?.tags.map((tag, index) => (
            <Grid item>
              <Box sx={getTagStyle(tag?.value)} key={index}>
                {tag?.value}
              </Box>
            </Grid>
          ))}

          <Grid item>
            <EditOutlinedIcon
              color='action'
              sx={checkIfButtonsAreShown(data.status)}
              onClick={e => {
                e.stopPropagation()
                handleEdit(data)
              }}
            />
            <DeleteOutlinedIcon
              color='error'
              sx={checkIfButtonsAreShown(data.status)}
              onClick={e => {
                e.stopPropagation()
                onDelete(data)
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default TaskDetailsCard
