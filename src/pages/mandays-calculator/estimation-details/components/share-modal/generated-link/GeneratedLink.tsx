import type { ReactElement } from "react"

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { ControlledTextField } from "~/components/form/controlled";
import { CustomButton } from "~/components/form/button";

type RenderLinkProps = {
  link: string;
  setIsShare: (value: boolean) => void;
};

const GeneratedLink = (props: RenderLinkProps): ReactElement => {
  const { link, setIsShare } = props;
  return (
    <Grid container sx={{ mt: 4 }}>
      <Grid item xs={12}>
        <Typography variant="body1" fontWeight="bold">
          Link:
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
              <Button variant="outlined">Go to link</Button>
            </Grid>
            <Grid item>
              <CustomButton>Copy to clipboard</CustomButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default GeneratedLink; 