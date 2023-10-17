import type { ReactElement } from "react";
import { Grid, TextField, styled } from "@mui/material";
import { PageContainer } from "~/components/page-container";
import Title from "~/components/title/Title";
import { CustomButton } from "~/components/form/button";

const StyledTextField = styled(TextField)(() => ({
  width: "100%",
}));

const ODCManagement = (): ReactElement => {
  return (
    <>
      <Title title="ODC Management" />
      <PageContainer sx={{ background: "#FFFFFF" }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={5}>
            <StyledTextField size="small" placeholder="Enter keyword here..." />
          </Grid>
          <Grid item xs={7} container justifyContent="flex-end">
            <CustomButton type="button">Add ODC</CustomButton>
          </Grid>
        </Grid>
      </PageContainer>
    </>
  );
};

export default ODCManagement;
