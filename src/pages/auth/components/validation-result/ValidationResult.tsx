import { ReactNode } from "react";

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

import { ListItem, ListItemIcon } from "@mui/material";
import { useTranslation } from "react-i18next";
import LocalizationKey from "~/i18n/key";

interface ValidationResultProps {
  values: {
    password: string;
    confirmPassword: string;
  };
}

const ValidationResult = ({ values }: ValidationResultProps): ReactNode => {
  const { t } = useTranslation();
  const { changePassword } = LocalizationKey;

  const validationItems = [
    {
      test: values.password.length >= 8,
      testId: "length",
      message: t(changePassword.validationInfo.charCount),
    },
    {
      test: /[A-Z]/.test(values.password),
      testId: "uppecase",
      message: t(changePassword.validationInfo.uppercase),
    },
    {
      test: /[a-z]/.test(values.password),
      testId: "lowercase",
      message: t(changePassword.validationInfo.lowercase),
    },
    {
      test: /[0-9]/.test(values.password),
      testId: "number",
      message: t(changePassword.validationInfo.number),
    },
    {
      test: /(?=.*\W)/.test(values.password),
      testId: "symbol",
      message: t(changePassword.validationInfo.symbol),
    },
    {
      test:
        values.password === values.confirmPassword && values.password !== "",
      testId: "match",
      message: t(changePassword.validationInfo.match),
    },
  ];

  return (
    <>
      {validationItems.map(({ test, testId, message }) => (
        <ListItem key={testId} disablePadding={true}>
          <ListItemIcon>
            {test ? (
              <CheckIcon
                style={{ color: "lime" }}
                data-testid={`green-icon-password-${testId}`}
              />
            ) : (
              <CloseIcon
                style={{ color: "red" }}
                data-testid={`red-icon-password-${testId}`}
              />
            )}
          </ListItemIcon>
          {message}
        </ListItem>
      ))}
    </>
  );
};

export default ValidationResult;
