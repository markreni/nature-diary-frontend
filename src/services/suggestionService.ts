import axios from "axios";
import type { AxiosResponse } from "axios";
import type { SuggestionType, ObservationType } from "../types/types";
import baseURL from "./config";



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
  return await axios.get(`${baseURL}/observations/${observationId}/suggestions`, getConfig());
};

const addSuggestion = async (
  observationId: number,
  suggested_name: string
): Promise<AxiosResponse<SuggestionType>> => {
  return await axios.post(
    `${baseURL}/observations/${observationId}/suggestions`,
    { suggested_name },
    getConfig()
  );
};

const acceptSuggestion = async (
  suggestionId: number
): Promise<AxiosResponse<{ message: string; observation: ObservationType }>> => {
  return await axios.put(
    `${baseURL}/suggestions/${suggestionId}/accept`,
    {},
    getConfig()
  );
};

export default { setToken, getSuggestions, addSuggestion, acceptSuggestion };