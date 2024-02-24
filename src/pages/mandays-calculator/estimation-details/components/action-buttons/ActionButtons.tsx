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
  mode: "view" | "edit" | "add";
  isExposed?: boolean;
};

const ActionButtons = (props: ActionButtonsProps): ReactElement => {
  const {
    handleBackEvent,
    handleNext,
    handleSave,
    activeTab,
    length,
    mode,
    isExposed,
  } = props;
  const { common } = LocalizationKey;
  const { t } = useTranslation();

  return (
    <Stack
      display="flex"
      justifyContent={"flex-end"}
      flexDirection={"row"}
      gap={2}
    >
      {isExposed && activeTab === 0 ? (
        <></>
      ) : (
        <CustomButton
          colorVariant="neutral"
          onClick={handleBackEvent}
          type="button"
        >
          {t(common.backBtn)}
        </CustomButton>
      )}
      {activeTab < length && (
        <>
          {((mode === "view" && activeTab < 3) ||
            mode === "add" ||
            mode === "edit") && (
            <CustomButton onClick={handleNext} type="button">
              {t(common.nextBtn)}
            </CustomButton>
          )}
        </>
      )}
      {length === activeTab && (
        <CustomButton onClick={handleSave} type="submit">
          Finish
        </CustomButton>
      )}
    </Stack>
  );
};

export default ActionButtons;
