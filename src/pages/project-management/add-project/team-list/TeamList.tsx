import type { ReactElement } from "react";
import type { AddTeamForm as AddTeamFormType } from "../types";

import { useFormikContext } from "formik";

import { Stack, Typography } from "@mui/material";
import TeamListCard from "../components/TeamListCard";
import { StyledContainer } from "../components/TeamListCard/TeamListCard";

interface TeamListProps {
  readonly?: boolean;
  toggleEdit: (teamIndex: number) => any;
}

const TeamList = (props: TeamListProps): ReactElement => {
  const { readonly, toggleEdit } = props;
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
      {values?.teams?.length ? (
        values?.teams?.map((_team, index) => {
          return (
            <TeamListCard
              isReadOnly={readonly}
              isDefault={false}
              key={index}
              teamIndex={index}
              teamObject={_team}
              toggleEdit={(teamIndex) => toggleEdit(teamIndex)}
            />
          );
        })
      ) : (
        <StyledContainer $isDefault={true} key={0}>
          <Typography fontWeight="bold">Default</Typography>
        </StyledContainer>
      )}
    </Stack>
  );
};

export default TeamList;
