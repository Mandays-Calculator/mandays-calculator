import type { ReactElement } from "react";

import Typography from "@mui/material/Typography";

interface TitleProps {
  title: string;
  color?: string;
}
const Title = (props: TitleProps): ReactElement => {
  const { title, color = "primary" } = props;
  return (
    <Typography
      color={color}
      fontSize={40}
      fontWeight="600"
      data-testid="title-component"
    >
      {title}
    </Typography>
  );
};

export default Title;
