import { type UserListResponse } from "~/api/user-management";
import { useQuery, UseQueryResult } from "react-query";

import { getUserList } from "~/api/user-management/UserManagement";

type CommonType =
  | "user"
  | "role"
  | "odc"
  | "complexities"
  | "function"
  | "project"
  | "team"
  | "career_step"
  | "country"
  | "holidays"
  | undefined;

type CommonResponseDataObj = {
  id: string;
  [key: string]: string;
};

type CommonDataResponse = {
  data: CommonResponseDataObj[];
};

type CommonOption = SelectObject[];

const transformDataToOption = (
  param: UseQueryResult<any, Error>,
  type: CommonType
): CommonOption => {
  const { data } = param.data || [];
  if (data.length > 0) {
    switch (type) {
      // return value mapping depends on type
      case "user":
        return data.map((item: CommonResponseDataObj) => ({
          label: `${item.firstName} ${item.lastName}`,
          value: item.id,
        }));
      default:
        return data;
    }
  }
  return [];
};

const getCommonOption = <T>(type: CommonType): UseQueryResult<any, Error> => {
  switch (type) {
    case "user":
      return useQuery<UserListResponse, Error>("userList", getUserList, {
        staleTime: Infinity, // Data is never considered stale
        cacheTime: 1000 * 60 * 60 * 24, // Cache for 24 hours
      });
    default:
      return {
        data: [],
        error: undefined,
        status: "idle",
      } as unknown as UseQueryResult<T, Error>;
  }
};

export const useCommonOption = (type: CommonType) => {
  const queryResult = getCommonOption<CommonDataResponse>(type);
  return transformDataToOption(queryResult, type);
};
