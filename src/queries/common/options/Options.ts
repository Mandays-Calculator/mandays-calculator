import type { UserListResponse } from "~/api/user-management";
import type { OdcListResponse } from "~/api/odc";
import type {
  CareerStepResponse,
  CountryResponse,
  GenderResponse,
  RoleTypeResponse,
  Team,
} from "~/api/common";
import type { ForGetComplexities, GetComplexities } from "~/api/complexity";
import type { ProjectListResponse } from "~/api/projects";
import type {
  CommonDataResponse,
  CommonType,
  CommonOption,
  CommonResponseDataObj,
} from ".";

import { useQuery, UseQueryResult } from "react-query";

import { getODC } from "~/api/odc/ODC";
import { getComplexities } from "~/api/complexity";
import {
  getCareerSteps,
  getCountries,
  getGenders,
  getRoles,
  getTeams,
} from "~/api/common/Common";
import { getProjects } from "~/api/projects";
import { getUserList } from "~/api/user-management/UserManagement";

const cacheTime: number = 1000 * 60 * 60 * 24;

const transformDataToOption = (
  param: UseQueryResult<any, Error>,
  type: CommonType,
  withInfo: boolean,
): CommonOption => {
  const data = param?.data?.data || param?.data || param || [];
  if (data && data.length > 0) {
    switch (type) {
      // return value mapping depends on type
      case "user":
        if (withInfo) {
          return data.map((item: CommonResponseDataObj) => ({
            label: `${item.firstName} ${item.lastName}`,
            value: item.id,
            ...item,
          }));
        }
        return data.map((item: CommonResponseDataObj) => ({
          label: `${item.firstName} ${item.lastName}`,
          value: item.id,
        }));
      case "role":
        return data.map((item: CommonResponseDataObj) => ({
          label: `${item.role}`,
          value: item.id,
        }));
      case "gender":
        return data.map((item: CommonResponseDataObj) => ({
          label: `${item.name}`,
          value: item.id,
        }));
      case "career_step":
        return data.map((item: CommonResponseDataObj) => ({
          label: item.careerStep,
          value: item.careerStep,
        }));
      case "country":
        return data.map((item: CommonResponseDataObj) => ({
          label: item.name,
          value: item.cca2,
        }));
      case "project":
        return data.map((item: CommonResponseDataObj) => ({
          label: item.name,
          value: item.projectId,
        }));
      case "complexity":
      case "odc":
      default:
        return data
          .filter((item: CommonResponseDataObj) => item.active)
          .map((item: CommonResponseDataObj) => ({
            label: `${item.name}`,
            value: item.id,
          }));
    }
  }
  return [];
};

const getCommonOption = <T>(
  type: CommonType,
  params: any,
): UseQueryResult<any, Error> => {
  switch (type) {
    case "user":
      return useQuery<UserListResponse, Error>(
        ["userList", params],
        () => getUserList(params),
        {
          staleTime: Infinity,
          cacheTime: cacheTime,
        },
      );
    case "odc":
      return useQuery<OdcListResponse, Error>("odcList", getODC, {
        staleTime: Infinity,
        cacheTime: cacheTime,
      });
    case "role":
      return useQuery<RoleTypeResponse[], Error>("roles", getRoles, {
        staleTime: Infinity,
        cacheTime: cacheTime,
      });
    case "complexity":
      return useQuery<GetComplexities<ForGetComplexities[]>, Error>(
        "getComplexities",
        getComplexities,
        {
          staleTime: Infinity,
          cacheTime: cacheTime,
        },
      );
    case "project":
      return useQuery<ProjectListResponse, Error>("projectList", getProjects, {
        staleTime: Infinity,
        cacheTime: cacheTime,
      });
    case "country":
      return useQuery<CountryResponse[], Error>("countries", getCountries, {
        staleTime: Infinity,
        cacheTime: cacheTime,
      });
    case "gender":
      return useQuery<GenderResponse[], Error>("genders", getGenders, {
        staleTime: Infinity,
        cacheTime: cacheTime,
      });
    case "career_step":
      return useQuery<CareerStepResponse[], Error>(
        "careerSteps",
        getCareerSteps,
        {
          staleTime: Infinity,
          cacheTime: cacheTime,
        },
      );
    case "team":
      return useQuery<Team[], Error>(
        ["teams", params],
        () => getTeams(params),
        {
          staleTime: Infinity,
          cacheTime: cacheTime,
        },
      );
    default:
      return [{ label: "", value: "" }] as unknown as UseQueryResult<T, Error>;
    // {
    //   data: [],
    //   error: undefined,
    //   status: "idle",
    // } as unknown as UseQueryResult<T, Error>; // will use in the future
  }
};

/**
 * Get common options and convert into Select object
 * @param {string} type - Type of common option
 * @param {Object} params - Object to pass a param in API
 * @param {boolean} withInfo - Returns other info
 */
export const useCommonOption = (
  type: CommonType,
  params?: any,
  withInfo: boolean = false,
) => {
  const queryResult = getCommonOption<CommonDataResponse>(type, params);
  return transformDataToOption(queryResult, type, withInfo);
};
