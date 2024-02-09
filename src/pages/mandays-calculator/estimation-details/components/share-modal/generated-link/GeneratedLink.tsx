import { useState, type ReactElement } from "react";
import type { TFunction } from "i18next";

import Grid from "@mui/material/Grid";
import { Box, Button, Stack, styled } from "@mui/material";

import LocalizationKey from "~/i18n/key";

import { ControlledTextField } from "~/components/form/controlled";
import { Alert, SvgIcon } from "~/components";
import { useTimeout } from "~/hooks/timeout";

import { StyledBackButton, StyledLinkButton } from "../styles";
import { copyToClipboard } from "~/pages/mandays-calculator/utils/copyToClipboard";

type RenderLinkProps = {
  link: string;
  setIsShare: (value: boolean) => void;
  t: TFunction<"translation", undefined>;
};

const StyledCopyLinkButton = styled(Button)`
  background: #e4f7f9;
  color: inherit;
  border: 1px solid #979292;
  width: 100%;
  height: 100%;
`;

const GeneratedLink = (props: RenderLinkProps): ReactElement => {
  const { link, setIsShare, t } = props;
  const {
    mandaysCalculator: { modal },
  } = LocalizationKey;

  const [copyLink, setCopyLink] = useState<boolean>(false);
  const [timeout] = useTimeout();

  console.log(copyLink, "copyied linbk");
  return (
    <Grid mt={3}>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={9}>
            <ControlledTextField name="link" disabled value={link} />
          </Grid>
          <Grid item xs={3}>
            <StyledCopyLinkButton
              onClick={() => {
                setCopyLink(true);
                copyToClipboard(link);
                timeout(() => setCopyLink(false));
              }}
            >
              <SvgIcon name="copy" $size={3} sx={{ mr: 1 }} />
              Copy
            </StyledCopyLinkButton>
          </Grid>
        </Grid>
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

      {copyLink && (
        <Alert
          open={copyLink}
          type="success"
          message="The link has been copied to your clipboard."
          title="Copied link."
        />
      )}
    </Grid>
  );
};

export default GeneratedLink;
