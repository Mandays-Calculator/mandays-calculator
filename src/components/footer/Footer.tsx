import type { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import LocalizationKey from "~/i18n/key";
import { StyledFooterContainer, StyledFooterText } from ".";

const Footer = (): ReactElement => {
  const { t } = useTranslation();
  return (
    <StyledFooterContainer maxWidth={false}>
      <StyledFooterText variant="body2" color="text.secondary" align="center">
        &copy; {new Date().getFullYear()} {t(LocalizationKey.footerLabel)}
      </StyledFooterText>
    </StyledFooterContainer>
  );
};

export default Footer;
