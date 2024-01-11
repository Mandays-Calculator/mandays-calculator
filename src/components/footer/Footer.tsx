import type { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import LocalizationKey from "~/i18n/key";
import { StyledFooter, StyledFooterText } from ".";

const Footer = (): ReactElement => {
  const { t } = useTranslation();
  return (
    <StyledFooter position="fixed" sx={{ bottom: 0, top: "auto" }}>
      <StyledFooterText
        variant="body2"
        color="text.secondary"
        align="center"
        data-testid="footer-label"
      >
        &copy; {new Date().getFullYear()} {t(LocalizationKey.footerLabel)}
      </StyledFooterText>
    </StyledFooter>
  );
};

export default Footer;
