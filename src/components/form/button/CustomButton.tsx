import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";

type ColorVariants =
  | "primary"
  | "primaryDark"
  | "primaryLight"
  | "secondary"
  | "error"
  | "warning"
  | "success"
  | "neutral";

interface StyledButtonProps extends ButtonProps {
  colorVariant: ColorVariants;
}

const StyledButton = styled(Button)<StyledButtonProps>(
  ({ theme, colorVariant }) => {
    const colorsMap: Record<ColorVariants, string> = {
      primary: theme.palette.primary.main,
      primaryDark: theme.palette.primary.dark,
      primaryLight: theme.palette.primary.light,
      secondary: theme.palette.secondary.main,
      error: theme.palette.error.main,
      warning: theme.palette.warning.main,
      success: theme.palette.success.main,
      neutral: "#FFFFFF",
    };
    const contrastTextMap: Record<ColorVariants, string> = {
      primary: theme.palette.primary.contrastText,
      primaryDark: theme.palette.primary.contrastText,
      primaryLight: "#000000",
      secondary: theme.palette.primary.contrastText,
      error: theme.palette.primary.contrastText,
      warning: theme.palette.primary.contrastText,
      success: theme.palette.primary.contrastText,
      neutral: "#000000",
    };

    return {
      backgroundColor: colorsMap[colorVariant],
      color: contrastTextMap[colorVariant],
      textTransform: "none",
      "&:hover": {
        backgroundColor: colorsMap[colorVariant], // Keep the same background color on hover
        opacity: 0.9,
      },
    };
  }
);
interface CustomButtonProps extends ButtonProps {
  colorVariant?: ColorVariants;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  colorVariant = "primary",
  ...props
}) => {
  return <StyledButton colorVariant={colorVariant} {...props} />;
};

export default CustomButton;
