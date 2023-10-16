import { Container, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledAuthContainer = styled("div")`
  height: 100%;
  background: ${({ theme }) => theme.palette.primary.light};
`;

const StyledContainer = styled(Container)`
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex: 1 0 0;
  height: 100vh;
  align-self: stretch;
`;

const StyledGrid = styled(Grid)`
  background: #fefefe;
  display: flex;
  width: 500px;
  padding: 68px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  flex-shrink: 0;
  align-self: stretch;
  border-radius: 0px 30px 30px 0px;
`;

const StyledImageContainer = styled("div")`
  position: absolute;
  left: -124px;
  right: -32px;
  bottom: 47px;
`;

const StyledLogoContainer = styled("div")`
  position: absolute;
  bottom: 10px;
  left: 15px;
`;

const AuthImageContainer = styled(Grid)`
  height: 600px;
  position: relative;
  border-radius: 30px 0px 0px 30px;
  background: #1aa9e8;
`;

const StyledTitle = styled(Typography)`
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -2.4px;
`;

const StyledLabel = styled(Typography)`
  margin-bottom: 5px;
  font-size: inherit;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -1.4px;
`;

export {
  StyledAuthContainer,
  StyledContainer,
  StyledLogoContainer,
  StyledImageContainer,
  StyledLabel,
  StyledTitle,
  StyledGrid,
  AuthImageContainer,
};
