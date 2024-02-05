import type { ReactElement } from "react";
import { IconButton, Typography, styled } from "@mui/material";
import { SvgIcon } from "~/components";

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
  return (
    <StyledButtonContainer>
      <IconButton onClick={onClick}>
        <SvgIcon name="add" color="primary" />
        <Typography variant="body1" sx={{ ml: 1 }}>
          Add ODC
        </Typography>
      </IconButton>
    </StyledButtonContainer>
  );
};

export default AddOdcButton;
