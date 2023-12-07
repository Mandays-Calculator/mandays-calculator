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
  ["&:hover"]: {
    borderColor: theme.palette.primary.main,
  },
  [`&:focus`]: {
    borderColor: theme.palette.primary.main,
  },
}));

const TextArea = (props: TextareaAutosizeProps): ReactElement => {
  const { name, label, placeholder = "Please Input", minRows, ...rest } = props;
  return (
    <Stack
      direction="column"
      gap={1}
    >
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
