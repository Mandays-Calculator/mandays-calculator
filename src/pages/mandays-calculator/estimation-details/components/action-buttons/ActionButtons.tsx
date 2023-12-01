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
  length: number;
};

const ActionButtons = (props: ActionButtonsProps): ReactElement => {
  const { handleBackEvent, handleNext, handleSave, activeTab, length } = props;
  const { common } = LocalizationKey;
  const { t } = useTranslation();
  return (
    <Stack
      display="flex"
      justifyContent={"flex-end"}
      flexDirection={"row"}
      gap={2}
    >
      <CustomButton
        colorVariant="neutral"
        onClick={handleBackEvent}
        type="button"
      >
        {t(common.backBtn)}
      </CustomButton>
      {activeTab < length && (
        <CustomButton
          onClick={handleNext}
          type="button"
        >
          {t(common.nextBtn)}
        </CustomButton>
      )}
      {length === activeTab && (
        <CustomButton
          onClick={handleSave}
          type="submit"
        >
          {t(common.saveBtn)}
        </CustomButton>
      )}
    </Stack>
  );
};

export default ActionButtons;
