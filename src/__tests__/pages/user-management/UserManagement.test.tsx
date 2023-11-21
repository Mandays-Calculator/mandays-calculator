import { render, screen, waitFor } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import ProviderWrapper from "~/__tests__/utils/ProviderWrapper";

import { UserManagement } from "~/pages/user-management/";
// import { mockUseUserList } from "./utils/mockUserManagementApis";

jest.mock("react-i18next", () => ({
  ...jest.requireActual("react-i18next"),
  useTranslation: () => ({ t: (key: any) => key }),
}));

describe("View User Management", () => {
  test("Render User Management", async () => {
    const user = UserEvent.setup();

    render(
      <ProviderWrapper>
        <UserManagement />
      </ProviderWrapper>
    );

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
});
