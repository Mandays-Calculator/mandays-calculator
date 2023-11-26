import { useEffect, useState } from 'react';
import { Avatar, Divider, Grid, Stack, Typography } from '@mui/material';
import { User, getUsers } from '~/api/user';
import { ErrorMessage, Select, TextField } from '~/components';
import { CustomButton } from '~/components/form/button';
import { Modal } from '~/components/modal';

type Members = User & { isSelected: boolean };

type DialogSearchUserProps = {
  showMemberDialog: boolean;
  toggleDialog: ($event?: any) => void;
};

const DialogSearchUser = (props: DialogSearchUserProps) => {
  const { showMemberDialog, toggleDialog } = props;
  const [odcList, setOdcList] = useState([] as any[]);
  const [userList, setUserList] = useState<Members[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const renderUserList = (user: Members, index: number) => {
    return (
      <Grid item xs={2} sm={4} md={4} key={index}>
        <Grid
          display={'flex'}
          alignItems={'center'}
          sx={{
            width: '100%',
            borderRadius: '7px',
            padding: '0.4rem',
            cursor: 'pointer',
            backgroundColor: user.isSelected ? '#ecebeb' : '',
          }}
          onClick={() => onSelectUser(user)}
        >
          <Avatar alt='Remy Sharp' />
          <div style={{ marginLeft: '10px' }}>
            <Typography>
              {user.lastName}, {user.firstName} {user.middleName ?? ''}
            </Typography>
            <Typography>{user.odc.abbreviation}</Typography>
            <Typography>{user.careerStep}</Typography>
          </div>
        </Grid>
      </Grid>
    );
  };

  const onSelectUser = (selectedUser: Members) => {
    setUserList(
      userList.map((user) => {
        const newUser = user;
        if (newUser.id == selectedUser.id) {
          newUser.isSelected = !newUser.isSelected;
        }
        return newUser;
      }),
    );
  };

  const onSubmit = () => {
    let selectedUsers = userList.filter((user) => user.isSelected);

    if (!selectedUsers.length) {
      setErrorMessage('Select at least 1(one) user to proceed');
      setTimeout(() => {
        setErrorMessage('');
      }, 2000);

      return;
    }
    toggleDialog(selectedUsers);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUsers();
        const result = Array.isArray(response?.data) ? response.data : [];

        setUserList(result.map((x) => ({ ...x, isSelected: false })));
        setOdcList([
          {
            value: '1',
            label: 'Filter 1',
          },
        ]);
      } catch (error) {
        setUserList([]);
      }
    };

    fetchData().catch((e: any) => {
      console.log(e);
    });
  }, []);

  return (
    <>
      <Modal open={showMemberDialog} title='Search User' maxWidth='sm' onClose={() => toggleDialog()}>
        <Stack direction='column'>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField name='name' label='Name' fullWidth />
            </Grid>
            <Grid item xs={6}>
              <Stack direction='column' gap={1}>
                <Typography>ODC</Typography>
                <Select name='odc' placeholder='ODC' fullWidth options={odcList} />
              </Stack>
            </Grid>
          </Grid>
        </Stack>
        <Divider sx={{ m: '10px 1rem 0' }} />

        <Stack direction={'row'} sx={{ p: '1rem' }}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {userList.map((user, index) => renderUserList(user, index))}
          </Grid>
        </Stack>

        <Stack direction='row' display='flex' justifyContent='flex-end' gap={1}>
          <CustomButton
            type='button'
            colorVariant='secondary'
            onClick={() => toggleDialog()}
            data-testid='test-cancel-btn'
          >
            Cancel
          </CustomButton>
          <CustomButton type='button' colorVariant='primary' onClick={onSubmit} data-testid='test-select-btn'>
            Select
          </CustomButton>
        </Stack>
      </Modal>
      <ErrorMessage error={errorMessage} type={'alert'} duration={2000} />
    </>
  );
};

export default DialogSearchUser;
