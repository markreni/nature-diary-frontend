import type { ObservationType } from "../types/types";

const getTodayDate = (): string => {
  return new Date().toISOString().split('T')[0];
};

export const getRandomThreeObservations = (observations: ObservationType[]): ObservationType[] => {
  return observations.sort(() => Math.random() - 0.5).slice(0, 3);
}

export default { getTodayDate, getRandomThreeObservations };