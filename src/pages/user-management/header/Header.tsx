import { useState } from "react";
import type { ReactElement } from "react";

import Grid from "@mui/material/Grid";
import { styled } from "@mui/material";

import { TextField, Select } from "~/components";
import { CustomButton } from "~/components/form/button";
import { AddUserModal } from "~/components/modal/user-management/add-user-modal";
import { filterOptions } from "./utils";
import { FormikContextType } from "formik";
import { UserManagementForms } from "../types";

const StyledButton = styled(CustomButton, {
  shouldForwardProp: (propsName) => propsName !== "noBorder",
})<{ noBorder?: boolean }>(({ noBorder = false }) => ({
  border: noBorder ? "none" : "1px solid #414145",
  height: "100%",
}));

const Header = ({
  formik,
}: {
  formik: FormikContextType<UserManagementForms>;
}): ReactElement => {
  const [addModal, setAddModal] = useState(false);

  return (
    <>
      <Grid container gap={1}>
        <Grid item xs={3}>
          <TextField
            name="filterValue"
            placeholder="Enter keyword here..."
            onChange={formik.handleChange}
            value={formik.values.filterValue}
          />
        </Grid>
        <Grid item xs={1.5}>
          <Select
            name="filterProperty"
            placeholder="Filter by"
            fullWidth
            options={filterOptions}
            onChange={(event) => {
              formik.setFieldValue("filterProperty", event.target.value);
            }}
            value={formik.values.filterProperty}
          />
        </Grid>
        <Grid item xs={1.9}></Grid>
        <Grid xs={1} item></Grid>
        <Grid xs={2} item></Grid>
        <Grid xs={2} item>
          <StyledButton
            colorVariant="primary"
            fullWidth
            noBorder
            onClick={() => setAddModal(true)}
            name="add"
            data-testid="test-add-user-btn"
          >
            Add User
          </StyledButton>
        </Grid>
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
