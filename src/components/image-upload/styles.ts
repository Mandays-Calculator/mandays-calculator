import { Avatar, Box } from "@mui/material";
import { styled } from "@mui/system";

export const StyledAvatar = styled(Avatar)({
  width: 150,
  height: 150,
  padding: 4,
  cursor: "pointer",
  "&:hover": {
    opacity: 0.5,
  },
});

export const ImageUploadContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "16px",
  marginBottom: "16px",
});
