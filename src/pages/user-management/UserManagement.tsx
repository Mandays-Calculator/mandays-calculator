import type { ReactElement } from "react";

import Stack from "@mui/system/Stack";

import Title from "~/components/title/Title";
import { PageContainer } from "~/components/page-container";

import UserList from "./user-list";
import Header from "./header";

const UserManagement = (): ReactElement => {
  return (
    <>
      <Title title="User Management" />
      <PageContainer>
        <Stack
          direction={"column"}
          spacing={2}
        >
          <Header />
          <UserList />
        </Stack>
      </PageContainer>
    </>
  );
};

export default UserManagement;
