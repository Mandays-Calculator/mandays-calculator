import { IconButton } from "@mui/material";
import { TextField } from "~/components/form/text-field";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { useState } from "react";
import { UserModal } from "./user-modal";
import { BaseTextFieldProps } from "@mui/material";

interface UserSelectModalProps extends BaseTextFieldProps {
  onUserSelect: (value: SelectObject) => void;
  label?: string;
}

const UserSelectModal = ({
  name,
  onUserSelect,
  label,
  value,
  error,
  ...rest
}: UserSelectModalProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <>
      <TextField
        disabled={true}
        InputProps={{
          endAdornment: (
            <IconButton
              aria-label="close"
              color="inherit"
              size="large"
              onClick={() => setOpenModal(true)}
            >
              <GroupAddIcon
                color={error ? "error" : "primary"}
                sx={{ fontSize: "2rem" }}
              />
            </IconButton>
          ),
        }}
        readOnly
        name={name || ""}
        label={label}
        value={(value as SelectObject).label}
        error={error}
        {...rest}
      />

      {openModal && (
        <UserModal
          open={openModal}
          toggleOpen={setOpenModal}
          onSelectUser={onUserSelect}
        />
      )}
    </>
  );
};

export default UserSelectModal;
