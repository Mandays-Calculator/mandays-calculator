import type { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { IconButton, Typography, styled } from "@mui/material";
import { SvgIcon } from "~/components";
import LocalizationKey from "~/i18n/key";

interface AddODCButtonProps {
  onClick: () => void;
}

const StyledButtonContainer = styled("div")`
  margin-top: 1.1rem;
  font-size: 0.9rem;
  color: inherit;
  border: 1px dashed #c4ced4;
  border-radius: 20px;
  text-align: center;
`;

const AddOdcButton = ({ onClick }: AddODCButtonProps): ReactElement => {
  const {
    mandaysCalculator: {
      resourceList: { labels },
    },
  } = LocalizationKey;

  const { t } = useTranslation();

  return (
    <StyledButtonContainer>
      <IconButton onClick={onClick}>
        <SvgIcon name="add" color="primary" />
        <Typography variant="body1" sx={{ ml: 1 }}>
          {t(labels.addODC)}
        </Typography>
      </IconButton>
    </StyledButtonContainer>
  );
};

export default AddOdcButton;
