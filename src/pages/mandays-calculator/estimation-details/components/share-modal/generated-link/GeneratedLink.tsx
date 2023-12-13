import type { ReactElement } from "react"
import type { TFunction } from "i18next";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { ControlledTextField } from "~/components/form/controlled";
import { CustomButton } from "~/components/form/button";
import LocalizationKey from "~/i18n/key";

type RenderLinkProps = {
  link: string;
  setIsShare: (value: boolean) => void;
  t: TFunction<"translation", undefined>;
};

const GeneratedLink = (props: RenderLinkProps): ReactElement => {
  const { link, setIsShare, t } = props;
  const { mandaysCalculator: { modal } } = LocalizationKey;

  return (
    <Grid container sx={{ mt: 4 }}>
      <Grid item xs={12}>
        <Typography variant="body1" fontWeight="bold">
          {t(modal.link)}:
        </Typography>
        <ControlledTextField name="link" disabled value={link} />
      </Grid>
      <Grid container justifyContent="s" sx={{ mt: 1 }} rowGap={1}>
        <Grid item xs={3}>
          <Button variant="outlined" onClick={() => setIsShare(false)}>Back</Button>
        </Grid>
        <Grid item xs={9}>
          <Grid container justifyContent={"end"} rowGap={2} columnGap={2}>
            <Grid item>
              <Button 
                variant="outlined" 
                onClick={() => window.open(`${window.location.origin}/mandays-estimation-detail`, '_blank', 'noreferrer')}
              >
                {t(modal.redirect)}
              </Button>
            </Grid>
            <Grid item>
              <CustomButton>{t(modal.copyLink)}</CustomButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default GeneratedLink; 