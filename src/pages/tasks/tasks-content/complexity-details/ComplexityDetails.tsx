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

interface StyledComplexityLabelProps
  extends React.ComponentProps<typeof Typography> {
  details?: boolean;
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

const StyledComplexityModal = styled(Modal)({
  minWidth: "480px",
});

const StyledComplexityLabel = styled(Typography)<StyledComplexityLabelProps>(
  ({ details = false }) => {
    if (details) {
      return {
        fontWeight: 600,
      };
    }

    return {
      fontWeight: 600,
      marginBottom: 10,
    };
  },
);

const StyledComplexityDetails = styled(Typography)({
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
    <StyledComplexityModal
      open={open}
      title={t(LocalizationKey.tasks.createTask.complexity)}
      maxWidth='md'
      onClose={() => onClose()}
    >
      <Grid container spacing={2}>
        <Grid item xs={4} sm={3} md={2}>
          <StyledComplexityLabel>
            {t(LocalizationKey.complexity.label.complexity)}
          </StyledComplexityLabel>
          <StyledComplexityLabel>
            {t(LocalizationKey.complexity.label.noOfDays)}
          </StyledComplexityLabel>
          <StyledComplexityLabel>
            {t(LocalizationKey.complexity.label.noOfFeatures)}
          </StyledComplexityLabel>
        </Grid>
        <Grid item xs={8} sm={9} md={10}>
          <StyledComplexityDetails>
            {details.complexity}
          </StyledComplexityDetails>
          <StyledComplexityDetails>{details.days}</StyledComplexityDetails>
          <StyledComplexityDetails>{details.features}</StyledComplexityDetails>
        </Grid>
        <Grid item xs={12}>
          <StyledComplexityLabel details>
            {t(LocalizationKey.complexity.label.description)}
          </StyledComplexityLabel>
        </Grid>
        <Grid item xs={12}>
          <Typography>{details.description}</Typography>
        </Grid>
        <Grid item xs={12}>
          <StyledComplexityLabel details>
            {t(LocalizationKey.complexity.label.samples)}
          </StyledComplexityLabel>
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
    </StyledComplexityModal>
  );
};

export default ComplexityDetails;
