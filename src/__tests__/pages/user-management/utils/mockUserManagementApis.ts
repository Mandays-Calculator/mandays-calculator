import { UseQueryResult } from "react-query";
import { UserListResponse } from "~/api/user-management";
import { useUserList } from "~/queries/user-management/UserManagement";

export const mockUseUserList = useUserList as jest.MockedFunction<
  typeof useUserList
>;

mockUseUserList.mockImplementation(() => {
  return {
    status: 200,
    data: [
      {
        id: "102d39bc-8457-11ee-a981-a0291936d359",
        odc: {
          id: "7fc01977-6e35-11ee-8624-a0291936d1c2",
          name: "Philippines",
          abbreviation: "PHODC",
          location: "Pasig City, Metro Manila, Philippines",
          holidays: null,
          active: true,
        },
        firstName: "Kevin",
        lastName: "Rosaria",
        middleName: null,
        suffix: null,
        gender: "FEMALE",
        email: "kmrosaria.ext@gmail.com",
        employeeId: "1",
        careerStep: "I06",
        joiningDate: "2022-11-21",
        roles: ["ROLE_SYS_ADMIN"],
        active: true,
      },
    ],
  } as unknown as UseQueryResult<UserListResponse, Error>;
});
