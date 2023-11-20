import type { ReactElement } from "react";

import Stack from "@mui/system/Stack";

import Title from "~/components/title/Title";
import { PageContainer } from "~/components/page-container";

import UserList from "./user-list";
import Header from "./header";
import Form from "~/components/form/Form";
import { useFormik } from "formik";
import { AddUserManagementFormValues, AddUserManagementSchema } from "./utils";
import { AddUserManagement } from "./types";

const UserManagement = (): ReactElement => {
  const AddUserManagementForm = useFormik<AddUserManagement>({
    initialValues: AddUserManagementFormValues,
    validationSchema: AddUserManagementSchema,

    onSubmit: (values) => console.log("values", values),
  });
  return (
    <>
      <Title title="User Management" />
      <PageContainer>
        <Form instance={AddUserManagementForm}>
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
