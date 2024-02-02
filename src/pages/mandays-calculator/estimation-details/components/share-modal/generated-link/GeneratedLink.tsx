import type { ReactElement } from "react";
import type { TFunction } from "i18next";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { ControlledTextField } from "~/components/form/controlled";
import LocalizationKey from "~/i18n/key";

import { StyledBackButton, StyledLinkButton } from "../styles";
import { Box, Stack } from "@mui/material";

type RenderLinkProps = {
  link: string;
  setIsShare: (value: boolean) => void;
  t: TFunction<"translation", undefined>;
};

const GeneratedLink = (props: RenderLinkProps): ReactElement => {
  const { link, setIsShare, t } = props;
  const {
    mandaysCalculator: { modal },
  } = LocalizationKey;

  return (
    <Grid mt={3}>
      <Grid item xs={12}>
        <Typography variant="body1" fontWeight="bold"></Typography>
        <ControlledTextField name="link" disabled value={link} />
      </Grid>

      <Grid item xs={12} my={5}>
        <Stack flexDirection="row" justifyContent="flex-end">
          <Box pr={2}>
            <StyledBackButton
              variant="text"
              color="inherit"
              onClick={() => setIsShare(false)}
            >
              Back
            </StyledBackButton>
          </Box>
          <StyledLinkButton
            variant="contained"
            color="primary"
            onClick={() =>
              window.open(
                `${window.location.origin}/mandays-estimation-detail`,
                "_blank",
                "noreferrer",
              )
            }
          >
            {t(modal.redirect)}
          </StyledLinkButton>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default GeneratedLink;
