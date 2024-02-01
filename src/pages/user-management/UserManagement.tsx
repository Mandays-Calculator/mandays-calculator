import type { ReactElement } from "react";
import type { UserManagementForms } from "./types";
import type { UserListData } from "~/api/user-management/types";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import Stack from "@mui/system/Stack";
import { useFormik } from "formik";
import moment from "moment";

import Form from "~/components/form/Form";
import Title from "~/components/title/Title";
import { PageContainer } from "~/components/page-container";
import { useUserList } from "~/queries/user-management/UserManagement";
import { useRequestHandler } from "~/hooks/request-handler";
import { useAddUser } from "~/mutations/user-management";

import { UserManagementFormValues, UserManagementSchema } from "./utils";
import UserList from "./user-list";
import Header from "./header";

const UserManagement = (): ReactElement => {
  const { t } = useTranslation();
  const AddUser = useAddUser();
  const [successAddUser, setSuccessAddUser] = useState<boolean>(false);
  const [errorAddUser, setErrorAddUser] = useState<boolean>(false);
  const [status, callApi] = useRequestHandler(
    AddUser.mutate,
    () => setSuccessAddUser(true),
    () => setErrorAddUser(true),
  );
  const UserManagementForm = useFormik<UserManagementForms>({
    initialValues: UserManagementFormValues,
    validationSchema: UserManagementSchema(t),
    validateOnChange: false,

    onSubmit: (values) => {
      const AddUserForm: UserManagementForms = {
        firstName: values.firstName,
        lastName: values.lastName,
        middleName: values.middleName || "",
        suffix: values.suffix || "",
        gender: Number(values?.gender) ?? 0,
        email: values.email,
        employeeId: values.employeeId,
        odcId: values.odcId || "",
        careerStep: values.careerStep || "",
        joiningDate:
          moment(values.joiningDate).format("YYYY-MM-DD") ||
          moment().format("YYYY-MM-DD"),
        projectId: values.projectId || "",
        teamId: values.teamId || "",
        roles: values.roles || [],
        image: values.image || "",
      };

      callApi(AddUserForm);
    },
  });

  useEffect(() => {
    UserManagementForm.resetForm();
  }, [successAddUser]);

  const { data } = useUserList();
  const [filteredData, setFilteredData] = useState<UserListData[]>([]);
  useEffect(() => {
    if (!data) {
      setFilteredData([]);
      return;
    }

    const filtered = data.data.filter((user: UserListData) => {
      const filterValue = UserManagementForm.values.filterValue ?? "";

      if (UserManagementForm.values.filterProperty) {
        const propertyValue =
          user[UserManagementForm.values.filterProperty as keyof UserListData];

        if (typeof propertyValue === "string") {
          return propertyValue
            .toLowerCase()
            .includes(filterValue.toLowerCase());
        }

        if (typeof propertyValue === "boolean") {
          return filterValue.toLowerCase() === "active";
        }

        if (typeof propertyValue === "object") {
          return ["administrator", "admin"].includes(filterValue.toLowerCase());
        }
        return false;
      } else if (filterValue) {
        return Object.values(user).some((value) =>
          typeof value === "string"
            ? value.toLowerCase().includes(filterValue.toLowerCase())
            : typeof value === "boolean"
            ? filterValue.toLowerCase() === "active"
            : typeof value === "object"
            ? ["administrator", "admin"].includes(filterValue.toLowerCase())
            : false,
        );
      }

      return true;
    });
    setFilteredData(filtered);
  }, [
    UserManagementForm.values.filterProperty,
    UserManagementForm.values.filterValue,
    data,
  ]);

  return (
    <>
      <Title title="User Management" />
      <PageContainer>
        <Form instance={UserManagementForm}>
          <Stack direction={"column"} spacing={2}>
            <Header
              formik={UserManagementForm}
              status={status}
              isSuccess={successAddUser}
              isError={errorAddUser}
              resetIsSuccess={() => {
                setErrorAddUser(false), setSuccessAddUser(false);
              }}
            />
            <UserList
              isSuccessAddUser={successAddUser}
              userListData={filteredData}
            />
          </Stack>
        </Form>
      </PageContainer>
    </>
  );
};

export default UserManagement;
