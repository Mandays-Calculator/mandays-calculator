import { useState, type ReactElement, ChangeEvent } from "react";
import type { AddTeamForm as AddTeamFormType } from "../types";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import { CustomButton } from "~/components/form/button";
import { TextField } from "~/components";
import { useFormikContext } from "formik";

import UserSelectModal from "../components/users-select/UserSelectModal";

interface AddTeamFormProps {
  onCancel: () => void;
}

const AddTeamForm = (props: AddTeamFormProps): ReactElement => {
  const { onCancel } = props;
  const { values, setValues } = useFormikContext<AddTeamFormType>();
  const [teamName, setTeamName] = useState<string>("");
  const [teamLead, setTeamLead] = useState<SelectObject>({
    label: "",
    value: "",
  });

  const [teamNameError, setTeamNameError] = useState<boolean>(false);
  const [teamLeadError, setTeamLeadError] = useState<boolean>(false);
  const addTeam = (): void => {
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
    if (teamName !== "" && teamLead.value !== "") {
      setValues({
        ...values,
        teams: [
          ...(values.teams || []),
          { teamName: teamName, teamLead: teamLead, teamMembers: [] },
        ],
      });
      setTeamName("");
      setTeamLead({ label: "", value: "" });
      onCancel();
    }
  };

  const getTeamName = (e: ChangeEvent<HTMLInputElement>): void => {
    setTeamName(e.target.value);
  };

  return (
    <Stack direction="column" gap={2}>
      <Typography padding={{ padding: "0 1rem 0 1rem" }} fontWeight="bold">
        Add Team
      </Typography>
      <Grid container spacing={2} sx={{ padding: "0 1rem 0 1rem" }}>
        <Grid item xs={6}>
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
        <Grid item xs={6}>
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
      <Stack
        direction="row"
        display="flex"
        justifyContent="flex-end"
        gap={1}
        sx={{ padding: "0 1rem 0 1rem" }}
      >
        <CustomButton type="button" colorVariant="secondary" onClick={onCancel}>
          Cancel
        </CustomButton>
        <CustomButton type="button" colorVariant="primary" onClick={addTeam}>
          Add
        </CustomButton>
      </Stack>
    </Stack>
  );
};

export default AddTeamForm;
