import { useEffect, useState } from "react";
import type { ReactElement } from "react";

import Grid from "@mui/material/Grid";
import { styled } from "@mui/material";

import { TextField, Select } from "~/components";
import { CustomButton } from "~/components/form/button";
import { AddUserModal } from "~/pages/user-management/user-management-modal/add-user-modal";
import { APIStatus } from "~/hooks/request-handler";
import { filterOptions } from "./utils";
import { FormikContextType } from "formik";
import { UserManagementForms } from "../types";

const StyledButton = styled(CustomButton, {
  shouldForwardProp: (propsName) => propsName !== "noBorder",
})<{ noBorder?: boolean }>(({ noBorder = false }) => ({
  border: noBorder ? "none" : "1px solid #414145",
  height: "100%",
}));
interface HeaderProps {
  status: APIStatus;
  formik: FormikContextType<UserManagementForms>;
  isSuccess: boolean;
  resetIsSuccess: () => void;
}
const Header = (props: HeaderProps): ReactElement => {
  const { status, formik, isSuccess, resetIsSuccess } = props;
  const [addModal, setAddModal] = useState<boolean>(false);

  useEffect(() => {
    if (isSuccess) {
      setAddModal(false);
    }
  }, [isSuccess]);

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
            onClick={() => {
              setAddModal(true);
              resetIsSuccess();
            }}
            name="add"
            data-testid="test-add-user-btn"
          >
            Add User
          </StyledButton>
        </Grid>
        <AddUserModal
          isSuccess={isSuccess}
          status={status}
          form={formik}
          OnSubmit={() => {
            formik.submitForm();
          }}
          open={addModal}
          onAddUser={() => setAddModal(false)}
          onClose={() => setAddModal(false)}
        />
      </Grid>
    </>
  );
};

export default Header;
