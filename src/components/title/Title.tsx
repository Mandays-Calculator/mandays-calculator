import type { ReactElement } from "react";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

interface TitleProps {
  title: string;
  color?: string;
}

const StyledTitle = styled(Typography)`
  font-size: 2.5rem;
`;

const Title = (props: TitleProps): ReactElement => {
  const { title, color = "primary" } = props;
  return (
    <StyledTitle color={color} fontWeight="600">
      {title}
    </StyledTitle>
  );
};

export default Title;
