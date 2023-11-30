import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import { Table } from "~/components/table";

import { UserManagement } from "~/pages/user-management/";
import { userListData } from "./utils/tableUserValues";
import { userListColumns } from "~/pages/user-management/user-list/utils";
import { useTranslation } from "react-i18next";
import { mockUseUserList } from "./utils/mockUserManagementApis";
import ProviderWrapper from "~/__tests__/utils/ProviderWrapper";
jest.mock("~/queries/user-management/UserManagement");
jest.mock("react-i18next", () => ({
  ...jest.requireActual("react-i18next"),
  useTranslation: () => ({ t: (key: any) => key }),
}));

jest.mock("react-query", () => ({
  ...jest.requireActual("react-query"),
  useQuery: jest.fn(),
}));

describe("View User Management", () => {
  afterEach(() => {
    cleanup();
  });

  test("Render User Management", async () => {
    const user = UserEvent.setup();

    render(
      <ProviderWrapper>
        <UserManagement />
      </ProviderWrapper>
    );

    expect(mockUseUserList).toHaveBeenCalled();
    await waitFor(() => {
      const title = screen.getByText(/User Management/i);
      expect(title).toBeInTheDocument();

      const addButton = screen.getByTestId("test-add-user-btn");
      user.click(addButton);
      expect(addButton).toBeInTheDocument();
    });
  });

  jest.mock("formik", () => ({
    useFormikContext: () => {
      return {
        values: userListData,
      };
    },
  }));

  test("user management table and edit button test", async () => {
    const { t } = useTranslation();
    const { getByTestId, container } = render(
      <Table
        name={"user-list"}
        data={userListData}
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
      expect(editBtn).toBeInTheDocument();
      fireEvent.click(editBtn);
    });

    expect(container).toMatchSnapshot("user-management-table-edit");
  }, 12000);
});
