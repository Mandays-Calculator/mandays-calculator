import { ReactElement } from "react";

import { styled } from "@mui/material/styles";
import { Grid, Stack, Typography } from "@mui/material";

import { Modal } from "~/components";
import { CustomButton } from "~/components/form/button";

interface ComplexityDetailsProps {
  open: boolean;
  onClose: () => void;
  openCreateTask: () => void;
}

const details = {
  complexity: "Simple",
  days: "1 - 2 Days",
  features: "10 - 20",
  description:
    " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi, eligendi voluptatum asperiores animi magnam fugiat quae, doloremque quo ipsam velit explicabo dolorum sed! Labore, quisquam voluptatibus eius ex voluptates molestiae?",
  sampleList: [
    "Modal UI",
    "Styling of less than 10 from fields",
    "Re-arrange data display",
  ],
};

const StyledTypography = styled(Typography)({
  fontWeight: 600,
  marginBottom: 10,
});

const StyledDetails = styled(Typography)({
  marginBottom: 10,
});

const ComplexityDetails = (props: ComplexityDetailsProps): ReactElement => {
  const { open, onClose, openCreateTask } = props;

  const handleCloseComplexity = (): void => {
    openCreateTask();
    onClose();
  };

  return (
    <Modal
      open={open}
      title="Complexity Details"
      maxWidth="md"
      onClose={() => onClose()}
    >
      <Grid container>
        <Grid item xs={2}>
          <StyledTypography>Complexity</StyledTypography>
          <StyledTypography>No. of Days</StyledTypography>
          <StyledTypography> No. of Features</StyledTypography>
        </Grid>
        <Grid item xs={10}>
          <StyledDetails> {details.complexity}</StyledDetails>
          <StyledDetails> {details.days}</StyledDetails>
          <StyledDetails> {details.features}</StyledDetails>
        </Grid>
      </Grid>

      <Stack gap={1}>
        <Typography fontWeight={600}> Description</Typography>
        <Typography>{details.description}</Typography>
        <Typography fontWeight={600}> Sample</Typography>
        <ul>
          {details.sampleList.map((details, index) => (
            <li key={index}>{details}</li>
          ))}
        </ul>
      </Stack>

      <Stack direction="row" justifyContent="flex-end">
        <CustomButton
          type="button"
          colorVariant="primary"
          onClick={() => handleCloseComplexity()}
        >
          Close
        </CustomButton>
      </Stack>
    </Modal>
  );
};

export default ComplexityDetails;
