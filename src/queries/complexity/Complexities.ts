import { useQuery } from "react-query";
import { getComplexities, Complexities } from "~/api/complexity";

export const useGetComplexities = (id: string = "") =>
  useQuery<Complexities[], Error>(["getComplexities", id], () =>
    getComplexities(id)
  );
