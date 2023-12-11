import type { ReactElement } from "react";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import {
  TextareaAutosizeProps as MuiTextAreaAutoSizeProps,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { BaseInputProps } from "../types";

type TextareaAutosizeProps = BaseInputProps<MuiTextAreaAutoSizeProps>;

const StyledTextArea = styled(BaseTextareaAutosize)(({ theme }) => ({
  width: "100%",
  borderColor: theme.palette.grey[500],
  border: `2px solid inherit`,
  "&:hover": {
    border: `1px solid rgba(0, 0, 0, 0.87)`,
  },
  "&:focus, &:focus-visible": {
    border: `2px solid ${theme.palette.primary.main}`,
    outline: theme.palette.primary.main,
  },
  padding: theme.spacing(2.3, 2),
  font: "inherit",
  background: "transparent",
  borderRadius: 4,
  minHeight: "100px",
}));

const TextArea = (props: TextareaAutosizeProps): ReactElement => {
  const { name, label, placeholder = "Please Input", minRows, ...rest } = props;
  return (
    <Stack direction="column" gap={1}>
      {label ? <Typography>{label}</Typography> : null}
      <StyledTextArea
        id={name}
        aria-label={name}
        minRows={minRows}
        placeholder={placeholder}
        {...rest}
      />
    </Stack>
  );
};

export default TextArea;
