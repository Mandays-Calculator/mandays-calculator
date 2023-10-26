import type { ReactElement } from "react";
import type { AddTeamForm as AddTeamFormType } from "../types";

import { useFormikContext } from "formik";

import { Stack } from "@mui/material";
import TeamListCard from "../components/TeamListCard";

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
      {values?.teams?.map((_team, index) => (
        <TeamListCard
          isDefault={index === 0}
          key={index}
          teamIndex={index}
          teamObject={_team}
          toggleEdit={(teamIndex) => toggleEdit(teamIndex)}
        />
      ))}
    </Stack>
  );
};

export default TeamList;
