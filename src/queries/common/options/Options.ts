import { type UserListResponse } from "~/api/user-management";
import type { ODCListResponse } from "~/api/odc";

import { useQuery, UseQueryResult } from "react-query";

import { getODCList } from "~/api/odc/ODC";
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

const cacheTime: number = 1000 * 60 * 60 * 24;

const transformDataToOption = (
  param: UseQueryResult<any, Error>,
  type: CommonType
): CommonOption => {
  const data = param?.data || param?.data?.data || [];
  if (data && data.length > 0) {
    switch (type) {
      // return value mapping depends on type
      case "user":
        return data.map((item: CommonResponseDataObj) => ({
          label: `${item.firstName} ${item.lastName}`,
          value: item.id,
        }));
      case "odc":
        return data.map((item: CommonResponseDataObj) => ({
          label: `${item.name}`,
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
        staleTime: Infinity,
        cacheTime: cacheTime,
      });
    case "odc":
      return useQuery<ODCListResponse[], Error>("odcList", getODCList, {
        staleTime: Infinity,
        cacheTime: cacheTime,
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
