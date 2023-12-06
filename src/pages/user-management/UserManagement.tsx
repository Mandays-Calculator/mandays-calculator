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
import { useRequestHandler } from "~/hooks/request-handler";
import { useAddUser } from "~/mutations/user-management";
import { useTranslation } from "react-i18next";

const UserManagement = (): ReactElement => {
  const { t } = useTranslation();
  const AddUser = useAddUser();
  const [status, callApi] = useRequestHandler(AddUser.mutate);

  const UserManagementForm = useFormik<UserManagementForms>({
    initialValues: UserManagementFormValues,
    validationSchema: UserManagementSchema(t),
    validateOnChange: true,

    onSubmit: (values) => {
      const gender = () => {
        if (values.gender == "FEMALE") {
          return 1;
        } else if (values.gender == "MALE") {
          return 2;
        } else if (values.gender == "NON_BINARY") {
          return 3;
        } else if (values.gender == "PREFER_NOT_TO_SAY") {
          return 4;
        }
      };
      const AddUserForm: UserManagementForms = {
        firstName: values.firstName,
        lastName: values.lastName,
        middleName: values.middleName,
        suffix: values.suffix,
        gender: gender() ?? 0,
        // image: values.image,
        email: values.email,
        employeeId: values.employeeId,
        odcId: values.odcId,
        careerStep: values.careerStep,
        joiningDate: values.joiningDate,
        projectId: values.projectId,
        teamId: values.teamId,
        roles: values.roles,
      };
      callApi(AddUserForm);
    },
  });

  return (
    <>
      <Title title="User Management" />
      <PageContainer>
        <Form instance={UserManagementForm}>
          <Stack direction={"column"} spacing={2}>
            <Header status={status} form={UserManagementForm} />
            <UserList />
          </Stack>
        </Form>
      </PageContainer>
    </>
  );
};

export default UserManagement;
