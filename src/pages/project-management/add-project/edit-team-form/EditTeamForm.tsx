import { type ReactElement, useState, ChangeEvent } from "react";
import { Column } from "react-table";
import { useFormikContext } from "formik";
import { Grid, Typography, Stack, Box, IconButton, Divider, Avatar } from "@mui/material";

import { CustomButton } from "~/components/form/button";
import { AddTeamForm as AddTeamFormType } from "../types";
import { Table, TextField, SvgIcon, Select } from "~/components";
import { Modal } from "~/components/modal";

type DataType = {
  name: string;
  odc: string;
  careerStep: string;
};

type ColumnType = Column<DataType> & { id?: string };

interface EditTeamFormProps {
  teamIndex: number;
  onCancel: (teamIndex: number) => void;
}

const EditTeamForm = (props: EditTeamFormProps): ReactElement => {
  const { teamIndex, onCancel } = props;
  const { values, setValues } = useFormikContext<AddTeamFormType>();

  let team: any = values.teams.find((_val, index) => index === teamIndex);

  const [projectName, setProjectName] = useState<string>(values.projectName);
  const [teamName, setTeamName] = useState<string>(team.teamName);
  const [teamLead, setTeamLead] = useState<string>(team.teamLead);
  const [projectNameError, setProjectNameError] = useState<boolean>(false);
  const [teamNameError, setTeamNameError] = useState<boolean>(false);
  const [teamLeadError, setTeamLeadError] = useState<boolean>(false);
  const [showMemberDialog, setMemberDialog] = useState(false);

  const toggleDialog = () => {
    setMemberDialog(!showMemberDialog);
  };

  const editTeam = (): void => {
    if (projectName === "") {
      //Validation for project name field required rule
      setProjectNameError(true);
    } else {
      setProjectNameError(false);
    }
    if (teamName === "") {
      //Validation for team name field required rule
      setTeamNameError(true);
    } else {
      setTeamNameError(false);
    }
    if (teamLead === "") {
      //Valudation for team lead field required rule
      setTeamLeadError(true);
    } else {
      setTeamLeadError(false);
    }
    if (teamName !== "" && teamLead !== "") {
      let teams = values.teams.map((_val, index) => {
        if (index === teamIndex) {
          return { teamName: teamName, teamLead: teamLead };
        }
        return _val;
      });
      setValues({
        ...values,
        projectName: projectName,
        teams: teams,
      });
    }
  };

  const getProjectName = (e: ChangeEvent<HTMLInputElement>): void => {
    setProjectName(e.target.value);
  };

  const getTeamName = (e: ChangeEvent<HTMLInputElement>): void => {
    setTeamName(e.target.value);
  };

  const getTeamLead = (e: ChangeEvent<HTMLInputElement>): void => {
    setTeamLead(e.target.value);
  };

  const rows = [
    {
      name: "Delos Santos, Michelle",
      odc: "PH",
      careerStep: "I03",
    },
    {
      name: "Dela Cruz, Juan",
      odc: "PH",
      careerStep: "I03",
    },
  ];

  const columns: ColumnType[] = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "ODC",
      accessor: "odc",
    },
    {
      Header: "Career Step",
      accessor: "careerStep",
    },
    {
      Header: "",
      id: "actions",
      Cell: () => (
        <>
          <IconButton>
            <SvgIcon name="delete" color="error" $size={2} />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <>
    <Stack direction="column" gap={2}>
      <Typography padding={{ padding: "0 1rem 0 1rem" }} fontWeight="bold">
        Edit Team
      </Typography>
      <Grid container spacing={2} sx={{ padding: "0 1rem 0 1rem" }}>
        <Grid item xs={4}>
          <TextField
            name="projectName"
            label="Project Name"
            value={projectName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => getProjectName(e)}
            fullWidth
            error={projectNameError}
            helperText={projectNameError && "Please Input Project Name."}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            name="teamName"
            label="Team Name"
            value={teamName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => getTeamName(e)}
            fullWidth
            error={teamNameError}
            helperText={teamNameError && "Please Input Team Name."}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            name="teamLead"
            label="Team Lead"
            value={teamLead}
            onChange={(e: ChangeEvent<HTMLInputElement>) => getTeamLead(e)}
            fullWidth
            error={teamLeadError}
            helperText={teamLeadError && "Please Input Team Lead."}
          />
        </Grid>
      </Grid>

      <Grid
        container
        spacing={2}
        alignItems="flex-end"
        sx={{ padding: "0 1rem 0 1rem" }}
      >
        <Grid item xs={5}>
          <TextField
            name="members"
            label="Members"
            placeholder="Enter keyword here..."
          />
        </Grid>
        <Grid item xs={7} container justifyContent="flex-end">
          <CustomButton type="button" onClick={toggleDialog}>Add Members</CustomButton>
        </Grid>
      </Grid>

      <Box sx={{ padding: "0 1rem 0 1rem" }}>
        <Table name="ODCTable" columns={columns} data={rows} />
      </Box>

      <Stack
        direction="row"
        display="flex"
        justifyContent="flex-end"
        padding={2}
        spacing={2}
        sx={{ padding: "0 1rem 0 1rem" }}
      >
        <CustomButton
          colorVariant="secondary"
          type="button"
          onClick={() => onCancel(teamIndex)}
        >
          Cancel
        </CustomButton>
        <CustomButton onClick={editTeam}>Done</CustomButton>
      </Stack>
    </Stack>
    <Modal open={showMemberDialog} title='Search User' maxWidth='sm' onClose={toggleDialog}>
        <Stack direction='column'>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField name='teamName' label='Name' fullWidth />
            </Grid>
            <Grid item xs={6}>
              <Stack direction='column' gap={1}>
                <Typography>ODC</Typography>
                <Select
                  name='teamLead'
                  placeholder='ODC'
                  fullWidth
                  options={[
                    {
                      value: '1',
                      label: 'Filter 1',
                    },
                    {
                      value: '2',
                      label: 'Filter 2',
                    },
                  ]}
                />
              </Stack>
            </Grid>
          </Grid>
        </Stack>
        <Divider style={{'marginTop': '10px'}}/>
        <br />
        <Stack direction={'row'} gap={4} spacing={2} padding={{ padding: "0 1rem 1rem 1rem" }}>
          <Grid item xs={6} sx={{display: 'flex', alignItems: 'center'}}>
            <Avatar alt="Remy Sharp" />
            <div style={{marginLeft: '10px'}}>
              <Typography>Dela Cruz, Juan</Typography>
              <Typography>PH ODC</Typography>
              <Typography>I03</Typography>
            </div>
          </Grid>
          <Grid item xs={6} sx={{display: 'flex', alignItems: 'center'}}>
            <Avatar alt="Remy Sharp" />
            <div style={{marginLeft: '10px'}}>
              <Typography>Dela Cruz, Juan</Typography>
              <Typography>PH ODC</Typography>
              <Typography>I03</Typography>
            </div>
          </Grid>
        </Stack>
        <Stack direction={'row'} gap={4} spacing={2} padding={{ padding: "0 1rem 1rem 1rem" }}>
          <Grid item xs={6} sx={{display: 'flex', alignItems: 'center'}}>
            <Avatar alt="Remy Sharp" />
            <div style={{marginLeft: '10px'}}>
              <Typography>Dela Cruz, Juan</Typography>
              <Typography>PH ODC</Typography>
              <Typography>I03</Typography>
            </div>
          </Grid>
          <Grid item xs={6} sx={{display: 'flex', alignItems: 'center'}}>
            <Avatar alt="Remy Sharp" />
            <div style={{marginLeft: '10px'}}>
              <Typography>Dela Cruz, Juan</Typography>
              <Typography>PH ODC</Typography>
              <Typography>I03</Typography>
            </div>
          </Grid>
        </Stack>
        
        <Stack direction='row' display='flex' justifyContent='flex-end' gap={1}>
          <CustomButton type='button' colorVariant='secondary' onClick={toggleDialog}>
            Cancel
          </CustomButton>
          <CustomButton type='button' colorVariant='primary' onClick={toggleDialog}>
            Select
          </CustomButton>
        </Stack>
      </Modal>
    </>
  );
};

export default EditTeamForm;
