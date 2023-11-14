import type { ReactElement } from "react";
import type { AddTeamForm as AddTeamFormType } from "../types";

import { useFormikContext } from "formik";

import { Stack, Typography } from "@mui/material";
import TeamListCard from "../components/TeamListCard";
import { StyledContainer } from "../components/TeamListCard/TeamListCard";

interface TeamListProps {
  toggleEdit: (teamIndex: number) => any;
}

const TeamList = (props: TeamListProps): ReactElement => {
  const { toggleEdit } = props;
  const { values } = useFormikContext<AddTeamFormType>();
  return (
    <Stack
      direction="column"
      maxHeight="350px"
      sx={{
        overflowY: "scroll",
        "&::-webkit-scrollbar": {
          width: "0px",
          background: "transparent",
        },
      }}
    >
      {values?.teams?.map((_team, index) => {
        if (index > 0) {
          return (
            <TeamListCard
              isDefault={false}
              key={index}
              teamIndex={index}
              teamObject={_team}
              toggleEdit={(teamIndex) => toggleEdit(teamIndex)}
            />
          );
        } else if (values.teams.length === 1) {
          return (
            <StyledContainer $isDefault={true} key={index}>
              <Typography fontWeight='bold'>Default</Typography>
            </StyledContainer>
          );
        }
      })}
    </Stack>
  );
};

export default TeamList;
