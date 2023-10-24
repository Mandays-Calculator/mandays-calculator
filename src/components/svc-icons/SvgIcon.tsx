import type { ReactElement } from "react";
import type { SvgIconsProps } from "./types";

import MuiSvgIcon from "@mui/material/SvgIcon";

import { styled } from "@mui/material";

const StyledSvgIcon = styled(MuiSvgIcon, {
  shouldForwardProp: (propName: string) => !propName.startsWith("$"),
})<{ $size: number }>(({ theme, $size }) => ({
  fontSize: theme.spacing($size),

  [theme.breakpoints.down("xl")]: {
    fontSize: theme.spacing($size),
  },
}));

export const SvgIcon = (props: SvgIconsProps): ReactElement => {
  const { name, sx, $size = 4, onClick, color } = props;

  return (
    <StyledSvgIcon
      $size={$size}
      sx={sx}
      onClick={onClick}
      color={color}
      data-testid="svg-component"
    >
      <svg aria-hidden="true">
        <use href={`#icon-${name}`} />
      </svg>
    </StyledSvgIcon>
  );
};

export default SvgIcon;
