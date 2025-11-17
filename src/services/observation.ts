import type {
  ObservationType,
  IObservationSavedResponse,
} from "../types/types.ts";
import api from "../services/api";
import type { AxiosResponse } from "axios";

const baseUrl = "/api/v1/observations";

let token: string | null = null;

const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`;
};

const create = async (
  newObject: ObservationType
): Promise<AxiosResponse<IObservationSavedResponse>> => {
  const config = {
    headers: { Authorization: token },
  };

  const response: AxiosResponse<IObservationSavedResponse> = await api.post(
    `${baseUrl}`,
    newObject,
    config
  );

  return response;
};

export default { create, setToken };
