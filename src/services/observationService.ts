import type {
  IObservationListResponse,
  IObservationSavedResponse,
} from "../types/types.ts";
import api from "./api.ts";
import baseURL from "./config.ts";
import axios from "axios";
import type { AxiosResponse } from "axios";

type ObservationQueryParams = {
  page: number;
  limit: number;
  identified?: boolean;
  publicOrPrivate?: boolean;
};

/*let token: string | null = null;

const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`;
};*/

const create = async (
  formData: FormData
): Promise<AxiosResponse<IObservationSavedResponse>> => {
  const response = await api.post(`api/v1/observations`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};

const getAll = async (
  page = 1,
  limit = 10,
  identified?: boolean,
  publicOrPrivate?: boolean
): Promise<IObservationListResponse> => {
  const params: ObservationQueryParams = { page, limit };

  if (identified !== undefined) params.identified = identified;

  if (publicOrPrivate !== undefined) params.publicOrPrivate = publicOrPrivate;

  const response = await api.get(`api/v1/public/observations`, { params });

  return {
    observations: response.data.data,
    total: response.data.pagination.total,
    page: response.data.pagination.page,
    totalPages: response.data.pagination.totalPages,
  };
};

const getAllObservations = async (
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
  const response = await api.get(`api/v1/public/observations/${id}`);

  return response.data;
};

const getByUser = async (
  page = 1,
  limit = 10
): Promise<IObservationListResponse> => {
  const response = await api.get(
    `api/v1/observations?page=${page}&limit=${limit}`
  );

  return {
    observations: response.data.data,
    total: response.data.pagination.total,
    page: response.data.pagination.page,
    totalPages: response.data.pagination.totalPages,
  };
};

const remove = async (id: number) => {
  const response = await api.delete(`api/v1/observations/${id}`);
  return response.data;
};

export default {
  create,
  getAll,
  getById,
  getByUser,
  remove,
  getAllObservations,
};
