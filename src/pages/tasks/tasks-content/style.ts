import theme from '~/theme'

export const taskStyle = {
  tag: {
    common: {
      borderRadius: '5px',
      padding: '3px',
      color: '#FFFFFF'
    },
    bug: {
      backgroundColor: theme.palette.error.main
    },
    reviewed: {
      backgroundColor: theme.palette.success.main
    },
    others: {
      backgroundColor: theme.palette.warning.main
    }
  }
}

export const taskDetailsCardStyles = {
  title: { fontSize: '1.2em', fontWeight: 'bold', cursor: 'pointer' },
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
  commentIcon: { marginRight: '3px' }
}

export const viewTaskDetailsStyle = {
  modal: {
    close: {
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      top: '8px',
      right: '3px'
    },
    container: {
      padding: '0px 10px 10px 10px',
      minWidth: { xs: '320px', sm: '520px' }
    }
  },
  label: { fontWeight: 600 },
  taskViewDetails: { marginTop: '10px' },
  comment: {
    accordion: {
      width: '100%',
      marginTop: '10px',
      boxShadow: 'none', // Remove box shadow
      '&:hover': {
        boxShadow: 'none' // Remove box shadow on hover as well if needed
      }
    },
    container: { marginBottom: '10px' },
    textbox: { backgroundColor: '#EAF3F4', marginLeft: '5px' },
    comment: {
      borderRadius: '5px',
      backgroundColor: '#dedede',
      padding: '5px',
      marginLeft: '5px'
    }
  }
}

export const getTagStyle = (value: string): object => {
  if (value === 'Bug') {
    return {
      ...taskStyle.tag.common,
      ...taskStyle.tag.bug
    }
  } else if (value === 'Reviewed') {
    return {
      ...taskStyle.tag.common,
      ...taskStyle.tag.reviewed
    }
  }

  return {
    ...taskStyle.tag.common,
    ...taskStyle.tag.others
  }
}
