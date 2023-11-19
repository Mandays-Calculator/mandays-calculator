import type { ReactElement } from "react";

import { Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { CustomButton } from "~/components/form/button";
import LocalizationKey from "~/i18n/key";

type ActionButtonsProps = {
  handleBackEvent: () => void;
  handleNext: () => void;
  handleSave: () => void;
  activeTab: number;
};

const ActionButtons = (props: ActionButtonsProps): ReactElement => {
  const { handleBackEvent, handleNext, handleSave, activeTab } = props;
  const { common } = LocalizationKey;
  const { t } = useTranslation();
  return (
    <Stack
      display="flex"
      justifyContent={"flex-end"}
      flexDirection={"row"}
      gap={2}
    >
      <CustomButton onClick={handleBackEvent}>{t(common.backBtn)}</CustomButton>
      {activeTab <= 2 && (
        <CustomButton onClick={handleNext}>{t(common.nextBtn)}</CustomButton>
      )}
      {activeTab === 3 && (
        <CustomButton onClick={handleSave}>{common.saveBtn}</CustomButton>
      )}
    </Stack>
  );
};

export default ActionButtons;
