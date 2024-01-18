import type {
  ForPostComplexities,
  PostComplexities,
  PutComplexities,
  ForPutComplexities,
  DeleteComplexities,
} from "~/api/complexity";

import { useMutation } from "react-query";

import {
  deleteComplexities,
  postComplexities,
  putComplexities,
} from "~/api/complexity";

export const usePostComplexities = () =>
  useMutation<PostComplexities, Error, ForPostComplexities>(postComplexities);

export const usePutComplexities = () =>
  useMutation<PutComplexities, Error, ForPutComplexities>(putComplexities);

export const useDeleteComplexities = () =>
  useMutation<DeleteComplexities, Error, string>(deleteComplexities);
