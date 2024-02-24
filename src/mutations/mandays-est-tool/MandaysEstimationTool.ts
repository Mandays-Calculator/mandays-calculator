import { AxiosError } from "axios";
import { useMutation } from "react-query";
import {
  CreateEstimationParam,
  deleteEstimation,
  createEstimation,
  ShareLinkParams,
  ShareLinkResponse,
  mandaysEstimationShareLink,
} from "~/api/mandays-est-tool";

export const useDeleteEstimation = () => {
  return useMutation<{ estimationId: string }, AxiosError, any>(
    "deletEstimation",
    (estimationId: string) => deleteEstimation({ estimationId: estimationId }),
  );
};

export const useCreateEstimation = () => {
  return useMutation<{ id: string }, AxiosError, CreateEstimationParam>(
    "addEstimation",
    (params) => createEstimation(params),
  );
};

export const useShareLink = () => {
  return useMutation<ShareLinkResponse, AxiosError, ShareLinkParams>(
    "shareLink",
    (params) => mandaysEstimationShareLink(params),
  );
};
