import { IconButton, TextFieldProps, styled } from "@mui/material";
import { TextField } from "~/components/form/text-field";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { useState } from "react";
import { UserModal } from "./user-modal";

const StyledUserSelectContainer = styled("div")`
  display: flex;
`;

const UserSelectModal = ({ name }: TextFieldProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <>
      <StyledUserSelectContainer>
        <TextField readOnly name={name || ""} />
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={() => setOpenModal(true)}
        >
          <GroupAddIcon fontSize="medium" />
        </IconButton>
      </StyledUserSelectContainer>
      {openModal && <UserModal open={openModal} toggleOpen={setOpenModal} />}
    </>
  );
};

export default UserSelectModal;
