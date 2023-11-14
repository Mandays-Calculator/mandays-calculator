import { useEffect, useState } from 'react';
import { Avatar, Divider, Grid, Stack, Typography } from '@mui/material';
import { Select, TextField } from '~/components';
import { CustomButton } from '~/components/form/button';
import { Modal } from '~/components/modal';

type DialogSearchUserProps = {
  showMemberDialog: boolean;
  toggleDialog: () => void;
};

const DialogSearchUser = (props: DialogSearchUserProps) => {
  const { showMemberDialog, toggleDialog } = props;
  const [odcList, setOdcList] = useState([] as any[]);

  const renderUserList = (index: number) => {
    return (
      <Grid item xs={2} sm={4} md={4} key={index} display={'flex'} alignItems={'center'}>
        <Avatar alt='Remy Sharp' />
        <div style={{ marginLeft: '10px' }}>
          <Typography>{'Dela Cruz, Juan'}</Typography>
          <Typography>{'PH ODC'}</Typography>
          <Typography>{'I05'}</Typography>
        </div>
      </Grid>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      // Make the axios API call here
      const sampleOdcList = [
        {
          value: '1',
          label: 'Filter 1',
        },
      ];
      setOdcList(sampleOdcList);
    };

    fetchData().catch((e: any) => {
      console.log(e);
    });
  }, []);

  return (
    <Modal open={showMemberDialog} title='Search User' maxWidth='sm' onClose={toggleDialog}>
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
      <Divider style={{ marginTop: '10px' }} />

      <br />

      <Stack direction={'row'} padding={{ padding: '0 1rem 1rem 1rem' }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {Array.from(Array(5)).map((_, index) => renderUserList(index))}
        </Grid>
      </Stack>

      <Stack direction='row' display='flex' justifyContent='flex-end' gap={1}>
        <CustomButton type='button' colorVariant='secondary' onClick={toggleDialog} data-testid="test-cancel-btn">
          Cancel
        </CustomButton>
        <CustomButton type='button' colorVariant='primary' onClick={toggleDialog} data-testid="test-select-btn">
          Select
        </CustomButton>
      </Stack>
    </Modal>
  );
};

export default DialogSearchUser;
