import type { PropsWithChildren, ReactElement } from "react";
import { Card as MuiCard, Typography, CardContent } from "@mui/material";

interface CardProps extends PropsWithChildren {
  title?: string;
}
export const Card = (props: CardProps): ReactElement => {
  const { title, children } = props;
  return (
    <MuiCard>
      <CardContent>
        <Typography
          fontWeight="bold"
          variant="h6"
        >
          {title}
        </Typography>
        {children}
      </CardContent>
    </MuiCard>
  );
};

export default Card;
