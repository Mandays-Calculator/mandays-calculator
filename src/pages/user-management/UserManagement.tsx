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

const UserManagement = (): ReactElement => {
  const UserManagementForm = useFormik<UserManagementForms>({
    initialValues: UserManagementFormValues,
    validationSchema: UserManagementSchema,

    onSubmit: (values) => console.log("values", values),
  });
  return (
    <>
      <Title title="User Management" />
      <PageContainer>
        <Form instance={UserManagementForm}>
          <Stack direction={"column"} spacing={2}>
            <Header />
            <UserList />
          </Stack>
        </Form>
      </PageContainer>
    </>
  );
};

export default UserManagement;
