import api from "./api";
import type { AxiosResponse } from "axios";
import type { SuggestionType, ObservationType } from "../types/types";

const baseUrl = "/api/v1"; 

let token: string | null = null;

const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`;
};

const getConfig = () => ({
  headers: { Authorization: token },
});

const getSuggestions = async (
  observationId: number
): Promise<AxiosResponse<SuggestionType[]>> => {
  return await api.get(`${baseUrl}/observations/${observationId}/suggestions`, getConfig());
};

const addSuggestion = async (
  observationId: number,
  suggested_name: string
): Promise<AxiosResponse<SuggestionType>> => {
  return await api.post(
    `${baseUrl}/observations/${observationId}/suggestions`,
    { suggested_name },
    getConfig()
  );
};

const acceptSuggestion = async (
  suggestionId: number
): Promise<AxiosResponse<{ message: string; observation: ObservationType }>> => {
  return await api.put(
    `${baseUrl}/suggestions/${suggestionId}/accept`,
    {},
    getConfig()
  );
};

export default { setToken, getSuggestions, addSuggestion, acceptSuggestion };