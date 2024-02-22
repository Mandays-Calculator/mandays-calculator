import { type ReactElement, useState, ChangeEvent, useEffect } from "react";
import type { User } from "~/api/user/types";
import type { AddTeamForm as AddTeamFormType, TeamObject } from "../types";
import type {
  ProjectListConfirmDialogType,
  TeamMembers,
} from "../../utils/types";

import { useTranslation } from "react-i18next";
import { useFormikContext } from "formik";
import { Grid, Typography, Stack /*Box*/ } from "@mui/material";
import {
  /*Table,*/ TextField,
  /*ErrorMessage,*/ ConfirmModal,
} from "~/components";
import { CustomButton } from "~/components/form/button";
// import { useTimeout } from "../../utils/functions";
// import { TeamListColumns } from "../../utils/columns";
import DialogSearchUser from "./DialogSearchUser";

import UserSelectModal from "../components/users-select/UserSelectModal";

interface EditTeamFormProps {
  teamIndex: number;
  onCancel: (teamIndex: number) => void;
}

const EditTeamForm = (props: EditTeamFormProps): ReactElement => {
  const { teamIndex, onCancel } = props;
  const { t } = useTranslation();
  const { values, setValues } = useFormikContext<AddTeamFormType>();

  let team: TeamObject = values.teams.find(
    (_val, index) => index === teamIndex,
  ) as TeamObject;

  const [projectName, setProjectName] = useState<string>(values.projectName);
  const [teamName, setTeamName] = useState<string>(team.teamName);
  const [teamLead, setTeamLead] = useState<SelectObject>(team.teamLead);
  const [projectNameError, setProjectNameError] = useState<boolean>(false);
  const [teamNameError, setTeamNameError] = useState<boolean>(false);
  const [teamLeadError, setTeamLeadError] = useState<boolean>(false);
  // const [searchMember, setSearchMember] = useState<string>("");
  const [tableData, setTableData] = useState<TeamMembers[]>([]);
  const [originTableData, setOriginTableData] = useState<TeamMembers[]>([]);
  const [showMemberDialog, setMemberDialog] = useState<boolean>(false);
  // const [errorEditTeamMsg, setErrorEditTeamMsg] = useState<string>("");
  const [confirmDialog, setConfirmDialog] =
    useState<ProjectListConfirmDialogType>({ open: false, id: "" });
  // const [triggerTimeout] = useTimeout();

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
    if (teamLead.value === "") {
      setTeamLeadError(true);
    } else {
      setTeamLeadError(false);
    }
    if (projectName !== "" && teamName !== "" && teamLead.value !== "") {
      let teams = values.teams.map((_val, index) => {
        if (index === teamIndex) {
          return { ..._val, teamName, teamLead, teamMembers: tableData };
        }
        return _val;
      });
      setValues({
        ...values,
        projectName: projectName,
        teams: teams as TeamObject[],
      });

      // const selectedTeam = teams.find((x) => x.teamMembers.length);
      // if (!selectedTeam) {
      //   setErrorEditTeamMsg(
      //     "Team members are required. Select at least 1(one) of the members"
      //   );

      //   triggerTimeout(() => setErrorEditTeamMsg(""));
      // } else {
      onCancel(teamIndex);
      // }
    }
  };

  const onToggleDialog = (selectedUsers?: User[]) => {
    if (selectedUsers) {
      initializeSelectedMembers(selectedUsers);
    }
    setMemberDialog(!showMemberDialog);
  };

  const initializeSelectedMembers = (selectedUsers: User[]) => {
    const users = selectedUsers.map((user) => {
      const memberName =
        user.firstName && user.lastName
          ? `${user.firstName}, ${user.lastName} ${user.middleName ?? ""}`
          : "-";

      return {
        ...user,
        name: memberName.trim(),
        careerStep: user.careerStep ?? "-",
        abbreviation: user.odc?.abbreviation ?? "-",
      } as TeamMembers;
    });

    let newMembers: TeamMembers[] = originTableData;

    for (const user of users) {
      const isMemberExists = originTableData.find(
        (originMember) => originMember.id == user.id,
      );
      if (!isMemberExists) newMembers.push(user);
    }

    setTableData(newMembers);
    setOriginTableData(newMembers);
  };

  const getProjectName = (e: ChangeEvent<HTMLInputElement>): void => {
    setProjectName(e.target.value);
  };

  const getTeamName = (e: ChangeEvent<HTMLInputElement>): void => {
    setTeamName(e.target.value);
  };

  // const onChangeMember = (e: ChangeEvent<HTMLInputElement>) => {
  //   const keyword = e.target.value;
  //   setSearchMember(keyword);

  //   setTableData(filteredMemberList(keyword));
  // };

  // const onChangeTeamLead = (teamLeadObject: SelectObject | null) => {
  //   if (!teamLeadObject) return;

  //   const isTeamMemberExist = originTableData.find(
  //     (tableData) => tableData.id === teamLeadObject.value
  //   );

  //   if (isTeamMemberExist) {
  //     setTableData(
  //       tableData.filter((tableData) => tableData.id !== teamLeadObject.value)
  //     );
  //     setOriginTableData(
  //       originTableData.filter(
  //         (tableData) => tableData.id !== teamLeadObject.value
  //       )
  //     );
  //   }

  //   setTeamLead(teamLeadObject);
  // };

  // const filteredMemberList = (keyword: string): TeamMembers[] => {
  //   return originTableData.filter((user) => {
  //     function isIncludes(property: string) {
  //       property = user[property as keyof TeamMembers] as string;
  //       return property.toLowerCase().includes(keyword.toLowerCase());
  //     }

  //     return (
  //       isIncludes("name") ||
  //       isIncludes("abbreviation") ||
  //       isIncludes("careerStep")
  //     );
  //   });
  // };

  // const onDelete = (userId: string): void => {
  //   setConfirmDialog({ open: !confirmDialog.open, id: userId });
  // };

  const deleteMembers = () => {
    const newList = originTableData.filter((row) => row.id != confirmDialog.id);
    setTableData(newList);
    setOriginTableData(newList);
    setConfirmDialog({ ...confirmDialog, open: false });
  };

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
              inputProps={{ "data-testid": "test-project-name" }}
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
              inputProps={{ "data-testid": "test-team-name" }}
            />
          </Grid>
          <Grid item xs={4}>
            <UserSelectModal
              name="teamLead"
              value={teamLead}
              label="Team Lead"
              onUserSelect={(value) => {
                setTeamLead(value as SelectObject);
              }}
              error={teamLeadError}
              helperText={teamLeadError ? "Please Input Team Lead." : ""}
            />
          </Grid>
        </Grid>

        {/* <Grid
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
              value={searchMember}
              onChange={onChangeMember}
            />
          </Grid>
          <Grid item xs={7} container justifyContent="flex-end">
            <CustomButton
              type="button"
              onClick={() => onToggleDialog()}
              data-testid="test-add-members-btn"
            >
              Add Members
            </CustomButton>
          </Grid>
        </Grid> */}

        {/* <Box sx={{ padding: "0 1rem 0 1rem" }}>
          <Table
            name="ODCTable"
            columns={TeamListColumns({ t, onDelete })}
            data={tableData}
            onRowClick={onTableRowClick}
          />
        </Box> */}

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
          <CustomButton onClick={editTeam} data-testid="test-done-edit-btn">
            Done
          </CustomButton>
        </Stack>
      </Stack>

      {showMemberDialog ? (
        <DialogSearchUser
          selectedTeamLead={teamLead}
          showMemberDialog={showMemberDialog}
          toggleDialog={($event) => onToggleDialog($event)}
        />
      ) : null}

      <ConfirmModal
        onConfirm={deleteMembers}
        open={confirmDialog.open}
        message={t("Are you sure you want to delete?")}
        onClose={() =>
          setConfirmDialog({
            open: false,
            id: "",
          })
        }
        selectedRow={null}
      />
      {/* <ErrorMessage error={errorEditTeamMsg} type={"alert"} /> */}
    </>
  );
};

export default EditTeamForm;
