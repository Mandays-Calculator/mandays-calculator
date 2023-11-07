import { useState } from "react";
import type { ReactElement } from "react";

import Grid from "@mui/material/Grid";
import { styled } from "@mui/material";

import { TextField, Select } from "~/components";
import { CustomButton } from "~/components/form/button";
import { AddUserModal } from "~/components/modal/user-management/add-user-modal";
import { BulkUserModal } from "~/components/modal/user-management/bulk-user-modal";

const StyledButton = styled(CustomButton, {
  shouldForwardProp: (propsName) => propsName !== "noBorder",
})<{ noBorder?: boolean }>(({ noBorder = false }) => ({
  border: noBorder ? "none" : "1px solid #414145",
  height: "100%",
}));

const Header = (): ReactElement => {
  const [addModal, setAddModal] = useState(false);
  const [modal, setModal] = useState(false);
  return (
    <>
      <Grid container gap={1}>
        <Grid item xs={3}>
          <TextField name="search-user" placeholder="Enter keyword here..." />
        </Grid>
        <Grid item xs={1.5}>
          <Select
            name="filter"
            placeholder="Filter by"
            fullWidth
            options={[
              {
                value: "1",
                label: "Filter 1",
              },
              {
                value: "2",
                label: "Filter 2",
              },
            ]}
          />
        </Grid>
        <Grid item xs={1.9}></Grid>
        <Grid xs={1} item>
          <StyledButton colorVariant="neutral" fullWidth>
            Sync
          </StyledButton>
        </Grid>
        <Grid xs={2} item>
          <StyledButton
            colorVariant="neutral"
            fullWidth
            onClick={() => setModal(true)}
          >
            Bulk Upload
          </StyledButton>
        </Grid>
        <Grid xs={2} item>
          <StyledButton
            colorVariant="primary"
            fullWidth
            noBorder
            onClick={() => setAddModal(true)}
          >
            Add User
          </StyledButton>
        </Grid>
        <BulkUserModal
          onBulkConfirm={() => {
            setModal(false);
          }}
          open={modal}
          onClose={() => {
            setModal(false);
          }}
        />
        <AddUserModal
          open={addModal}
          onAddUser={() => setAddModal(false)}
          onClose={() => setAddModal(false)}
        />
      </Grid>
    </>
  );
};

export default Header;
