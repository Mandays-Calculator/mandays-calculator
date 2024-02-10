import { type ReactElement } from "react";
import type { TFunction } from "i18next";

import Grid from "@mui/material/Grid";
import LocalizationKey from "~/i18n/key";
import { CustomButton } from "~/components/form/button";

interface HeaderButtonsProps {
  mode: string;
  isExposed: boolean | undefined;
  setIsExport: (value: boolean) => void;
  setIsShare: (value: boolean) => void;
  t: TFunction<"translation", undefined>;
}

const HeaderButtons = (props: HeaderButtonsProps): ReactElement => {
  const { mode, isExposed, setIsExport, setIsShare, t } = props;

  const { common } = LocalizationKey;

  return (
    <>
      {mode === "view" && !isExposed && (
        <Grid item xs={2}>
          <Grid container justifyContent={"end"}>
            <Grid item xs={5} mr={2}>
              <CustomButton onClick={() => setIsExport(true)}>
                {t(common.exportBtn)}
              </CustomButton>
            </Grid>
            <Grid item xs={5}>
              <CustomButton onClick={() => setIsShare(true)}>
                {t(common.shareBtn)}
              </CustomButton>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default HeaderButtons;
