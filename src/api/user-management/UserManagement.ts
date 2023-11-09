import axios from "axios";
import { getEnvConfig } from "~/utils/env-config";
import { UserListResponse } from ".";
import { AddUserParams, AddUserResponse } from "./types";

export const getUserList = async (): Promise<UserListResponse> => {
  const { apiBasePath } = getEnvConfig();
  const res = await axios.get<UserListResponse>(`${apiBasePath}/users`);
  return res.data;
};
// const token =
//   "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJPNG9mZ09YUm40a21sbDRkMzY5Nkk2T3hTaWFiV0NUSEsyRFoxOG40NTIwIn0.eyJleHAiOjE2OTk0MTM0MTQsImlhdCI6MTY5OTQxMTYxNCwianRpIjoiMDBiNTUyMTItMjQyNy00NWMxLWIwODktMzk0Njg4OWJhYjcxIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9tYW5kYXlzLWNhbGN1bGF0b3IiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiNjZhMGYyNDYtMTIyZC00MGNhLWE3MGMtNzYwY2Y1MjVkZjVkIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoibWMtY2xpZW50Iiwic2Vzc2lvbl9zdGF0ZSI6IjRkYWY2ODg0LTMwMmEtNGM4Yi1hMDM3LTE0ZThhMDYzYzQ5YSIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtbWFuZGF5cy1jYWxjdWxhdG9yIiwiUk9MRV9TUFJJTlRfTUFOQUdFUiIsIlJPTEVfVVNFUiIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJST0xFX1NZU19BRE1JTiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInNpZCI6IjRkYWY2ODg0LTMwMmEtNGM4Yi1hMDM3LTE0ZThhMDYzYzQ5YSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiTWFydGluIERpdGFsbyIsInByZWZlcnJlZF91c2VybmFtZSI6Im1hcnRpbi5iLmRpdGFsb0BwY2N3LmNvbSIsImdpdmVuX25hbWUiOiJNYXJ0aW4iLCJmYW1pbHlfbmFtZSI6IkRpdGFsbyIsImVtYWlsIjoibWFydGluLmIuZGl0YWxvMkBwY2N3LmNvbSJ9.WmahTKEt12ZWZY0f8XCQtvWforGWeKkLD1M4nsFlKsRfXFFab_VHgoyewpUC02c_zUmpdnDL7v2OdFzZWiINAo5kAMPILYkCRKFUbwOHUUJPLNydajNADM4rMghBQVuiTgxMP3EN5H2bu0M3qJVW8N1AAUCWMNUlKnAHnEAZZiAqreC0QsgHbedtx0hcOuA40oIn45VACxt8VfqCjN_zkX_sC-0mierqD8bLaJL11p3ezuaFYF52NHkbQGlva23jYxWLXzIUseV7F0eDtMpwJE4XqKMtJV66DWreEMRcmf9lVIKLKEmsG1XnZgpZjlSsNug-bFdHLnnR9ImES9yL4w";

export const AddUser = async (
  params: AddUserParams
): Promise<AddUserResponse> => {
  const { apiBasePath } = getEnvConfig();
  const res = await axios.post<AddUserResponse>(`${apiBasePath}/user`, {
    ...params,
  });
  return res;
};