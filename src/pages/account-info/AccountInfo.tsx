import type { ReactElement } from "react";

import { Avatar, Grid, Stack, Typography, Chip, styled } from "@mui/material";

import { Card, Title } from "~/components";
import { useUserAuth } from "~/hooks/user";
import AvatarImg from "~/assets/img/add-edit-avatar.png";
import renderRole from "~/utils/helpers/renderRoleHelper";
import CustomTabs from "~/components/tab/Tab";
import { Details, Settings } from "./tabs";

export const StyledTabContainer = styled("div")` 
  .MuiTabs-flexContainer {
    display: flex; 
  }
  .MuiDivider-root {
    margin: -0.5rem;
    border-width: 3px;
  }
  & .css-cy40gp-MuiButtonBase-root-MuiTab-root {
    flex-grow: 1;
    max-width: inherit;
  }
`;



const AccountInfo = (): ReactElement => {
  const { state: { user, projects } } = useUserAuth();
  const { firstName, lastName, careerStep, email, roles, gender, employeeId, odc } = user ?? {};
  const fullName = `${firstName} ${lastName}`;
  const renderRoles = () => <Stack gap={2} direction='row'>{roles?.map((values) => <Chip variant="outlined" label={renderRole(values)} />)}</Stack>

  const tabs = [
    { label: 'Details', content: <Details personal={{ fullName, gender, email, employeeId }} project={{ odc: odc?.name, project: projects }} /> },
    { label: 'Settings', content: <Settings /> }
  ];

  return (
    <>
      <Title title="Account Information" />
      <Card>
        <Stack direction='row' gap={2}>
          <Avatar alt={fullName} src={String(AvatarImg)} sx={{ width: '15rem', height: '15rem' }} />
          <Grid container direction='column' spacing={2}>
            <Grid item>
              <Typography variant="h4" fontWeight="bold" >{fullName}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5">Solution Developer, {careerStep}</Typography>
              <Typography variant="h5">{email}</Typography>
            </Grid>
            <Grid item />
            <Grid item>{renderRoles()}</Grid>
          </Grid>
        </Stack>
        <StyledTabContainer>
          <CustomTabs tabs={tabs}></CustomTabs>
        </StyledTabContainer>
      </Card>
    </>
  );
};

export default AccountInfo;
