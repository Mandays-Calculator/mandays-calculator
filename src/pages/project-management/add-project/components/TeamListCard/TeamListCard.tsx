import type { ReactElement } from "react";
import type { AddTeamForm as AddTeamFormType, TeamObject } from "../../types";

import { Typography, styled, IconButton } from "@mui/material";

import { PageContainer } from "~/components/page-container";
import { SvgIcon } from "~/components";
import { useFormikContext } from "formik";

export const StyledContainer = styled(PageContainer, {
  shouldForwardProp: (propName: string) => !propName.startsWith("$"),
})<{ $isDefault: boolean; $isAdd?: boolean }>(({ $isDefault, $isAdd }) => ({
  borderRadius: "0.625rem",
  background: "var(--Neutral---White, #FEFEFE)",
  boxShadow: "none",
  display: "flex",
  justifyContent: $isDefault ? "center" : "space-between",
  borderStyle: $isAdd ? "dashed" : "inherit",
  padding: "1rem",
}));

interface TeamListCardProps {
  isDefault: boolean;
  teamIndex: number;
  teamObject: TeamObject;
  toggleEdit: (teamIndex: number) => void;
}

const TeamListCard = (props: TeamListCardProps): ReactElement => {
  const { isDefault, teamIndex, teamObject, toggleEdit } = props;
  const { values, setValues } = useFormikContext<AddTeamFormType>();

  const handleDeleteCard = (event: any): void => {
    event.stopPropagation();
    setValues({
      ...values,
      teams: values.teams.filter((_val, index) => index !== teamIndex),
    });
  };
  return isDefault ? (
    <StyledContainer $isDefault={isDefault}>
      <Typography fontWeight="bold">Default</Typography>
    </StyledContainer>
  ) : (
    <StyledContainer
      $isDefault={isDefault}
      onClick={() => toggleEdit(teamIndex)}
    >
      <Typography fontWeight="bold">{teamObject.teamName}</Typography>
      <Typography fontWeight="bold">{teamObject.teamLead}</Typography>
      <IconButton onClick={($event) => handleDeleteCard($event)}>
        <SvgIcon name="delete" color="error" $size={2} />
      </IconButton>
    </StyledContainer>
  );
};

export default TeamListCard;
