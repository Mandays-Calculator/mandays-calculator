import type { PropsWithChildren, ReactElement, ReactNode } from "react";
import CheckIcon from "@mui/icons-material/Check";
import { styled } from "@mui/material/styles";

const StyledCheckIcon = styled(CheckIcon)`
  border-radius: 100px;
  font-size: 3.5rem;
  color: ${({ theme }) => theme.palette.primary.main};
  border: 5px solid ${({ theme }) => theme.palette.primary.main};
`;

const StyledContainer = styled("div")`
  display: flex;
  column-gap: 20px;
  align-items: center;
`;

const CustomCheckIcon = (props: {
  children: ReactNode;
}): PropsWithChildren<ReactElement> => {
  return (
    <StyledContainer>
      <StyledCheckIcon />
      {props.children}
    </StyledContainer>
  );
};

export default CustomCheckIcon;
