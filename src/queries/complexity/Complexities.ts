import type {
  ForPostComplexities,
  GetComplexities,
  PostComplexities,
  PutComplexities,
  ForPutComplexities,
  ForGetComplexities,
  DeleteComplexities,
} from "~/api/complexity";

import {
  deleteComplexities,
  getComplexities,
  getComplexitiesbyId,
  postComplexities,
  putComplexities,
} from "~/api/complexity";
import { useMutation, useQuery } from "react-query";

export const useGetComplexities = () =>
  useQuery<GetComplexities<ForGetComplexities[]>, Error>(
    "getComplexities",
    getComplexities
  );

export const useGetComplexitiesbyId = (id: string, shouldFetch: boolean) =>
  useQuery<GetComplexities<ForGetComplexities>, Error>(
    ["getComplexities", id],
    () => getComplexitiesbyId(id),
    {
      enabled: shouldFetch,
    }
  );

export const usePostComplexities = () =>
  useMutation<PostComplexities, Error, ForPostComplexities[]>(postComplexities);

export const usePutComplexities = () =>
  useMutation<PutComplexities, Error, ForPutComplexities>(putComplexities);

export const useDeleteComplexities = () =>
  useMutation<DeleteComplexities, Error, string>(deleteComplexities);
