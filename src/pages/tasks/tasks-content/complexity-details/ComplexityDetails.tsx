import type { ReactElement } from "react";

import { Grid, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";
import LocalizationKey from "~/i18n/key";

import { CustomButton } from "~/components/form/button";
import { Modal } from "~/components";

interface ComplexityDetailsProps {
  open: boolean;
  onClose: () => void;
  openCreateOrUpdateTask: () => void;
}

const details = {
  complexity: "Simple",
  days: "1 - 2 Days",
  features: "10 - 20",
  description:
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi, eligendi voluptatum asperiores animi magnam fugiat quae, doloremque quo ipsam velit explicabo dolorum sed! Labore, quisquam voluptatibus eius ex voluptates molestiae?",
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
  const { open, onClose, openCreateOrUpdateTask } = props;
  const { t } = useTranslation();

  const handleCloseComplexity = (): void => {
    openCreateOrUpdateTask();
    onClose();
  };

  return (
    <Modal
      open={open}
      title={t(LocalizationKey.tasks.createTask.complexity)}
      maxWidth='md'
      onClose={() => onClose()}
      sx={{ minWidth: "480px" }}
    >
      <Grid container spacing={2}>
        <Grid item xs={4} sm={3} md={2}>
          <StyledTypography>
            {t(LocalizationKey.complexity.label.complexity)}
          </StyledTypography>
          <StyledTypography>
            {t(LocalizationKey.complexity.label.noOfDays)}
          </StyledTypography>
          <StyledTypography>
            {t(LocalizationKey.complexity.label.noOfFeatures)}
          </StyledTypography>
        </Grid>
        <Grid item xs={8} sm={9} md={10}>
          <StyledDetails>{details.complexity}</StyledDetails>
          <StyledDetails>{details.days}</StyledDetails>
          <StyledDetails>{details.features}</StyledDetails>
        </Grid>
        <Grid item xs={12}>
          <Typography fontWeight={600}>
            {t(LocalizationKey.complexity.label.description)}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>{details.description}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography fontWeight={600}>
            {t(LocalizationKey.complexity.label.samples)}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <ul>
            {details.sampleList.map((details, index) => (
              <li key={index}>{details}</li>
            ))}
          </ul>
        </Grid>
      </Grid>

      <Stack direction='row' justifyContent='flex-end'>
        <CustomButton
          type='button'
          colorVariant='primary'
          onClick={() => handleCloseComplexity()}
        >
          {t(LocalizationKey.tasks.createTask.btnLabel.close)}
        </CustomButton>
      </Stack>
    </Modal>
  );
};

export default ComplexityDetails;
