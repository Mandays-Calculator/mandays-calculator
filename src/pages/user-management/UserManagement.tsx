import type { ReactElement } from "react";

import Stack from "@mui/system/Stack";

import Title from "~/components/title/Title";
import { PageContainer } from "~/components/page-container";

import UserList from "./user-list";
import Header from "./header";
import Form from "~/components/form/Form";
import { useFormik } from "formik";
import { UserManagementFormValues, UserManagementSchema } from "./utils";
import { UserManagementForms } from "./types";
import { useAddUser } from "~/queries/user-management/UserManagement";
import { useRequestHandler } from "~/hooks/request-handler";
import { Alert } from "~/components";
import { stat } from "fs";

const UserManagement = (): ReactElement => {
  const AddUser = useAddUser();
  const [status, callApi] = useRequestHandler(AddUser.mutate);

  const UserManagementForm = useFormik<UserManagementForms>({
    initialValues: UserManagementFormValues,
    validationSchema: UserManagementSchema,
    validateOnChange: true,
    onSubmit: (values) => {
      callApi(values);
    },
  });
  return (
    <>
      <Title title="User Management" />
      <PageContainer>
        <Form instance={UserManagementForm}>
          <Stack direction={"column"} spacing={2}>
            <Header form={UserManagementForm} />
            <UserList />
          </Stack>
        </Form>
      </PageContainer>

      {status.loading && (
        <Alert
          open={!status.success}
          message={"There is a problem with your request"}
          type={"error"}
        />
      )}
    </>
  );
};

export default UserManagement;
