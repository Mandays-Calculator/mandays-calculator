import { useState, type ReactElement, useEffect } from "react";

import Stack from "@mui/system/Stack";
import { useFormik } from "formik";

import Title from "~/components/title/Title";
import { PageContainer } from "~/components/page-container";
import Form from "~/components/form/Form";
import { useUserList } from "~/queries/user-management/UserManagement";
import { UserListData } from "~/api/user-management/types";
import { UserManagementFormValues, UserManagementSchema } from "./utils";

import { UserManagementForms } from "./types";
import UserList from "./user-list";
import Header from "./header";
const UserManagement = (): ReactElement => {
  const UserManagementForm = useFormik<UserManagementForms>({
    initialValues: UserManagementFormValues,
    validationSchema: UserManagementSchema,

    onSubmit: (values) => console.log("values", values),
  });
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
          return ["role_sys_admin", "admin"].includes(
            filterValue.toLowerCase()
          );
        }
        return false;
      } else if (filterValue) {
        return Object.values(user).some((value) =>
          typeof value === "string"
            ? value.toLowerCase().includes(filterValue.toLowerCase())
            : typeof value === "boolean"
            ? filterValue.toLowerCase() === "active"
            : typeof value === "object"
            ? ["role_sys_admin", "admin"].includes(filterValue.toLowerCase())
            : false
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
            <Header formik={UserManagementForm} />
            <UserList userListData={filteredData} />
          </Stack>
        </Form>
      </PageContainer>
    </>
  );
};

export default UserManagement;
