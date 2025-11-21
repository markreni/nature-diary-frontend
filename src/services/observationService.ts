import type {
  IObservationListResponse,
  IObservationSavedResponse,
} from "../types/types.ts";
import baseURL from "./config.ts";
import axios from "axios";
import type { AxiosResponse } from "axios";

let token: string | null = null;

const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`;
};

const create = async (
  formData: FormData
): Promise<AxiosResponse<IObservationSavedResponse>> => {
  const response = await axios.post(`${baseURL}api/v1/observations`, formData, {
    headers: {
      Authorization: token,
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};

const getAll = async (
  page = 1,
  limit = 10
): Promise<IObservationListResponse> => {
  const response = await axios.get(
    `${baseURL}api/v1/public/observations?page=${page}&limit=${limit}`
  );

  return {
    observations: response.data.data,
    total: response.data.pagination.total,
    page: response.data.pagination.page,
    totalPages: response.data.pagination.totalPages,
  };
};

const getById = async (id: number) => {
  const response = await axios.get(
    `${baseURL}api/v1/public/observations/${id}`
  );
  console.log("Response data in getById:", response.data);
  return response.data;
};

export default { create, setToken, getAll, getById };
