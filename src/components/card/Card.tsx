import type { PropsWithChildren, ReactElement } from "react";
import {
  Card as MuiCard,
  Typography,
  CardContent,
  CardHeader,
} from "@mui/material";

interface CardProps extends PropsWithChildren {
  title?: string;
  headerTitle?: string;
  subHeader?: string;
  actionHeader?: any;
}
export const Card = (props: CardProps): ReactElement => {
  const { title, children, headerTitle, subHeader, actionHeader, ...rest } =
    props;
  return (
    <MuiCard {...rest}>
      <CardHeader
        title={headerTitle}
        subheader={subHeader}
        action={actionHeader}
      />
      <CardContent>
        {title && (
          <Typography fontWeight="bold" variant="h6">
            {title}
          </Typography>
        )}
        {children}
      </CardContent>
    </MuiCard>
  );
};

export default Card;
