import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import ProviderWrapper from "~/__tests__/utils/ProviderWrapper";
import { Table } from "~/components/table";

import { UserManagement } from "~/pages/user-management/";
import { UserList } from "./utils/editUserValues";
import { userListColumns } from "~/pages/user-management/user-list/utils";
import { useTranslation } from "react-i18next";
// import { mockUseUserList } from "./utils/mockUserManagementApis";

jest.mock("react-i18next", () => ({
  ...jest.requireActual("react-i18next"),
  useTranslation: () => ({ t: (key: any) => key }),
}));

describe("View User Management", () => {
  const component = (
    <ProviderWrapper>
      <UserManagement />
    </ProviderWrapper>
  );
  afterEach(cleanup);
  test("Render User Management", async () => {
    const user = UserEvent.setup();
    render(component);
    await waitFor(() => {
      const title = screen.getByText(/User Management/i);
      expect(title).toBeInTheDocument();

      const addButton = screen.getByTestId("test-add-user-btn");
      user.click(addButton);
      expect(addButton).toBeInTheDocument();
    });
  });

  // test("Render User Management View List", async () => {
  //   const user = UserEvent.setup();

  //   expect(mockUseUserList).toHaveBeenCalled();

  //   render(
  //     <ProviderWrapper>
  //       <UserManagement />
  //     </ProviderWrapper>
  //   );

  //   await waitFor(() => {
  //     // expect(mockQueryUserListApi as jest.Mock).toHaveBeenCalledTimes(1);
  //     const editButton = screen.getByTestId("test-edit-user-btn");
  //     user.click(editButton);
  //     expect(editButton).toBeInTheDocument();
  //   });
  // });
  jest.mock("formik", () => ({
    useFormikContext: () => {
      return {
        values: UserList,
        setValues: jest.fn().mockImplementation(() => {
          return {
            UpdateFirstName: "",
            UpdateLastName: "",
            UpdateMiddleName: "",
            UpdateSuffix: "",
            UpdateGender: "",
            UpdateEmail: "",
            UpdateEmployeeId: "",
            UpdateOdcId: "",
            UpdateCareerStep: "",
            UpdateJoiningDate: "",
            UpdateProjectId: "",
            UpdateTeamId: "",
            UpdateRoles: [],
          };
        }),
      };
    },
  }));

  test("user management table and edit button test", async () => {
    const { t } = useTranslation();
    const { getByTestId, container } = render(
      <Table
        name={"user-list"}
        data={UserList}
        columns={userListColumns({
          t,
          onDeleteUser: jest.fn(),
          onEditUser: jest.fn(),
        })}
      />
    );
    expect(container.textContent).toMatch("ditalomartin@gmail.com");
    await waitFor(() => {
      const editBtn = getByTestId("test-edit-user-btn");
      // editBtn.onclick = () => mockOnEditUser();

      expect(editBtn).toBeInTheDocument();
      fireEvent.click(editBtn);
    });

    expect(container).toMatchSnapshot("user-management-table-edit");
  }, 12000);
});
