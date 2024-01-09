import type { ReactElement } from "react";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import {
  FormControl,
  FormHelperText,
  TextareaAutosizeProps as MuiTextAreaAutoSizeProps,
  Stack,
  styled,
  Theme,
  Typography,
} from "@mui/material";
import { BaseInputProps } from "../types";

type TextareaAutosizeProps = BaseInputProps<MuiTextAreaAutoSizeProps>;

const StyledTextArea = styled(BaseTextareaAutosize)(
  ({ theme, error }: { error: boolean | undefined; theme?: Theme }) => ({
    width: "100%",
    borderColor: error ? theme?.palette.error.main : theme?.palette.grey[500],
    border: `2px solid inherit`,
    "&:hover": {
      border: error ? `2px solid inherit` : `1px solid rgba(0, 0, 0, 0.87)`,
    },
    "&:focus, &:focus-visible": {
      border: error
        ? `2px solid inherit`
        : `2px solid ${theme?.palette.primary.main}`,
      outline: error ? theme?.palette.error.main : theme?.palette.primary.main,
    },
    padding: theme?.spacing(2.3, 2),
    font: "inherit",
    background: "transparent",
    borderRadius: 4,
    minHeight: "100px",
    outline: "inherit",
  })
);

export const TextArea = (props: TextareaAutosizeProps): ReactElement => {
  const {
    name,
    label,
    placeholder = "Please Input",
    minRows,
    helperText,
    error,
    ...rest
  } = props;
  return (
    <Stack direction="column" gap={1}>
      <FormControl fullWidth variant="outlined" error={error}>
        {label ? <Typography>{label}</Typography> : null}
        <StyledTextArea
          id={name}
          error={error}
          aria-label={name}
          minRows={minRows}
          placeholder={placeholder}
          data-testid="text-area-component"
          {...rest}
        />
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </Stack>
  );
};

export default TextArea;
