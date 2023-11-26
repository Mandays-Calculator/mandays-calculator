import type { ODCListResponse, ODCSubmit } from "~/api/odc";

export const NewODCData = {
  id: "",
  name: "",
  location: "",
  abbreviation: "",
  holidays: [],
  active: true,
};

export const SubmitFormat = (data: ODCListResponse): ODCSubmit => {
  const apiData = data;
  delete apiData["id"];
  return apiData;
};
