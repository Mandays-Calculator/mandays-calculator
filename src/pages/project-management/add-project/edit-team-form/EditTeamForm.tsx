import { type ReactElement, useState, ChangeEvent, useEffect } from "react";
import { Column } from "react-table";
import { useFormikContext } from "formik";
import {
  Grid,
  Typography,
  Stack,
  Box,
  IconButton,
} from "@mui/material";

import { CustomButton } from "~/components/form/button";
import { AddTeamForm as AddTeamFormType, TeamObject } from "../types";
import { Table, TextField, SvgIcon, ErrorMessage } from "~/components";
import DialogSearchUser from "./DialogSearchUser";
import { User } from "~/api/user";

type Members = {
  name: string;
  abbreviation: string;
  careerStep: string;
};

type ColumnType = Column<Members> & { id?: string };

interface EditTeamFormProps {
  teamIndex: number;
  onCancel: (teamIndex: number) => void;
}

const EditTeamForm = (props: EditTeamFormProps): ReactElement => {
  const { teamIndex, onCancel } = props;
  const { values, setValues } = useFormikContext<AddTeamFormType>();

  let team: TeamObject = values.teams.find((_val, index) => index === teamIndex) as TeamObject;

  const [projectName, setProjectName] = useState<string>(values.projectName);
  const [teamName, setTeamName] = useState<string>(team.teamName);
  const [teamLead, setTeamLead] = useState<string>(team.teamLead);
  const [projectNameError, setProjectNameError] = useState<boolean>(false);
  const [teamNameError, setTeamNameError] = useState<boolean>(false);
  const [teamLeadError, setTeamLeadError] = useState<boolean>(false);
  const [tableData, setTableData] = useState<Members[]>([]);
  const [showMemberDialog, setMemberDialog] = useState<boolean>(false);
  const [errorEditTeamMsg, setErrorEditTeamMsg] = useState<string>('');

  const editTeam = (): void => {
    if (projectName === "") {
      setProjectNameError(true);
    } else {
      setProjectNameError(false);
    }
    if (teamName === "") {
      setTeamNameError(true);
    } else {
      setTeamNameError(false);
    }
    if (teamLead === "") {
      setTeamLeadError(true);
    } else {
      setTeamLeadError(false);
    }
    if (projectName !== "" && teamName !== "" && teamLead !== "") {
      let teams = values.teams.map((_val, index) => {
        if (index === teamIndex) {
          return { teamName, teamLead, teamMembers: tableData };
        }
        return _val;
      });
      setValues({
        ...values,
        projectName: projectName,
        teams: teams,
      });

      const selectedTeam = teams.find(x => x.teamMembers.length);
      if (!selectedTeam) {
        setErrorEditTeamMsg('Team members are required. Select at least 1(one) of the members');

        setTimeout(() => setErrorEditTeamMsg(''), 3100);
      } else {
        onCancel(teamIndex);
      }
    }
  };

  const onToggleDialog = (selectedUsers?: User[]) => {
    if (selectedUsers) {
      initializeSelectedMembers(selectedUsers);
    }
    setMemberDialog(!showMemberDialog);
  };

  const initializeSelectedMembers = (selectedUsers: User[]) => {
    setTableData(
      selectedUsers.map((user) => ({
        ...user,
        name: `${user.firstName}, ${user.lastName} ${user.middleName ?? ''}`.trim(),
        abbreviation: user.odc.abbreviation,
      }))
    );
  }

  const onTableRowClick = ($event: any) => {
    console.log($event);
  }

  const getProjectName = (e: ChangeEvent<HTMLInputElement>): void => {
    setProjectName(e.target.value);
  };

  const getTeamName = (e: ChangeEvent<HTMLInputElement>): void => {
    setTeamName(e.target.value);
  };

  const getTeamLead = (e: ChangeEvent<HTMLInputElement>): void => {
    setTeamLead(e.target.value);
  };

  const columns: ColumnType[] = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "ODC",
      accessor: "abbreviation",
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

  useEffect(() => {
    const teamMembers = values.teams[teamIndex].teamMembers;
    initializeSelectedMembers(teamMembers as unknown as User[]);
  }, []);

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
              inputProps={{ 'data-testid': 'test-project-name' }}
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
              inputProps={{ 'data-testid': 'test-team-name' }}
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
              inputProps={{ 'data-testid': 'test-team-lead' }}
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
            <CustomButton type="button" onClick={() => onToggleDialog()} data-testid="test-add-members-btn">
              Add Members
            </CustomButton>
          </Grid>
        </Grid>

        <Box sx={{ padding: "0 1rem 0 1rem" }}>
          <Table name="ODCTable" columns={columns} data={tableData} onRowClick={onTableRowClick} />
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
            data-testid="test-cancel-edit-btn"
          >
            Cancel
          </CustomButton>
          <CustomButton onClick={editTeam} data-testid="test-done-edit-btn">Done</CustomButton>
        </Stack>
      </Stack>
      <DialogSearchUser showMemberDialog={showMemberDialog} toggleDialog={($event) => onToggleDialog($event)}/>
      <ErrorMessage error={errorEditTeamMsg} type={'alert'} duration={3000}/>
    </>
  );
};

export default EditTeamForm;
