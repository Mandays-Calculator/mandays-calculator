import { Container, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const containerHeight = 90;
const StyledAuthContainer = styled("div")`
  height: 100%;
  background: ${({ theme }) => theme.palette.primary.light};
`;

const StyledContainer = styled(Container)`
  min-width: ${({ theme }) => theme.spacing(125)};
  display: flex;
  padding: ${({ theme }) => theme.spacing(1.25)};
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1.25)};
  flex: 1 0 0;
  height: 100vh;
  align-self: stretch;
`;

const StyledGrid = styled(Grid)`
  height: ${({ theme }) => theme.spacing(containerHeight)};
  background: #fefefe;
  display: flex;
  width: ${({ theme }) => theme.spacing(62.5)};
  padding: ${({ theme }) => theme.spacing(8.5)};
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing(2.5)};
  flex-shrink: 0;
  align-self: stretch;
  border-radius: ${({ theme }) => theme.spacing(0, 3.75, 3.75, 0)};
`;

const StyledImageContainer = styled("div")`
  height: ${({ theme }) => theme.spacing(containerHeight)};
  position: absolute;
  left: ${({ theme }) => theme.spacing(-15.5)};
  right: ${({ theme }) => theme.spacing(-4)};
  @media (min-width: 1441px) {
    top: ${({ theme }) => theme.spacing(5.875)};
  }
`;

const StyledLogoContainer = styled("div")`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing(1.25)};
  left: ${({ theme }) => theme.spacing(1.875)};
`;

const AuthImageContainer = styled(Grid)`
  height: ${({ theme }) => theme.spacing(containerHeight)};
  position: relative;
  border-radius: ${({ theme }) => theme.spacing(3.75, 0, 0, 3.75)};
  background: #1aa9e8;
`;

const StyledTitle = styled(Typography)`
  margin-bottom: ${({ theme }) => theme.spacing(2.5)};
  font-size: ${({ theme }) => theme.spacing(3)};
  font-weight: 400;
  line-height: normal;
  letter-spacing: ${({ theme }) => theme.spacing(-0.3)};
`;

const StyledLabel = styled(Typography)`
  margin-bottom: ${({ theme }) => theme.spacing(0.625)};
  font-size: inherit;
  font-weight: 400;
  line-height: normal;
  letter-spacing: ${({ theme }) => theme.spacing(-0.175)};
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
