import type { AllTasksResponse } from '~/api/tasks/types'

import { ReactElement } from 'react'

import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { Box, Grid, Paper, Typography } from '@mui/material'
import EventIcon from '@mui/icons-material/Event'
import { useTranslation } from 'react-i18next'
import LocalizationKey from '~/i18n/key'

import { taskDetailsCardStyles, getTagStyle } from '../style'
import { Status } from '../utils'

interface TaskDetailsCardProps {
  data: AllTasksResponse
  handleEdit: (task: AllTasksResponse) => void
  handleViewDetails: (task: AllTasksResponse) => void
  onDelete: (task: AllTasksResponse) => void
}

const getContainerStyle = (status: string) => {
  if (status !== Status.OnHold && status !== Status.Backlog) {
    return { marginTop: 2, padding: 1.5, cursor: 'default' }
  }

  return { marginTop: 2, padding: 1.5, cursor: 'grab' }
}

const getButtonDisplayStyle = (status: string) => {
  if (status !== Status.OnHold && status !== Status.Backlog) {
    return { display: 'none', cursor: 'pointer' }
  }

  return { cursor: 'pointer' }
}

const setJustifyContent = (tag: number, status: string): string => {
  if (
    tagLengthFlag(tag) &&
    status !== Status.OnHold &&
    status !== Status.Backlog
  ) {
    return 'flex-start'
  }

  return 'space-between'
}

const tagLengthFlag = (tag: number): boolean => {
  return tag <= 2 && tag > 0
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
      sx={getContainerStyle(data?.status)}
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
              data?.complexity?.name}
          </Typography>
        </Grid>

        <Grid
          item
          container
          spacing={tagLengthFlag(data?.tags?.length) ? 1 : 0}
          justifyContent={setJustifyContent(data?.tags?.length, data?.status)}
          alignItems='center'
          xs={12}
        >
          <Grid item>
            <Box
              sx={taskDetailsCardStyles.comments}
              display='flex'
              alignItems='center'
            >
              <TextsmsOutlinedIcon sx={taskDetailsCardStyles.commentIcon} />
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
              sx={getButtonDisplayStyle(data?.status)}
              onClick={e => {
                e.stopPropagation()
                handleEdit(data)
              }}
            />
            <DeleteOutlinedIcon
              color='error'
              sx={getButtonDisplayStyle(data?.status)}
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
