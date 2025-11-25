type CategoryType = "fauna" | "flora" | "funga";
type DiscoveryType = "domestic" | "wildlife";

export interface PublicUser {
  id: number;
  firstName: string;
  lastName: string;
}

type ObservationType = {
  id: number;
  user?: PublicUser;
  scientific_name: string;
  common_name: string;
  description: string;
  date: string;
  location?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  images: ObservationImage[];
  public: boolean;
  identified: boolean;
  category: CategoryType;
  discovery: DiscoveryType;
  suggestions?: SuggestionType[];
};

export interface ObservationImage {
  id: number;
  imageName: string;
  addedDate: string;
}

interface IObservationSavedResponse {
  success: boolean;
  message: string;
  observationId: number;
}

interface IsignUp {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface ILogInResponse {
  accessToken: string;
  refreshToken: string;
  email: string;
  firstName: string;
  status: number;
  msg: string;
}

interface IResponse {
  success: boolean;
  message: string;
}

interface Icredentials {
  email: string;
  password: string;
}

interface IError {
  message: string[];
  type: string;
}

interface ObservationPayload {
  discovery: string;
  description: string;
  date: string;
  category: string;
  public: boolean;
  identified: boolean;
  scientific_name: string;
  common_name: string;
  lat?: number;
  lng?: number;
}

interface IObservationListResponse {
  observations: ObservationType[];
  total: number;
  page: number;
  totalPages: number;
}

interface LocationType {
  id: number;
  lat: number;
  lng: number;
  addedDate?: string;
  updatedDate?: string;
}

interface ObservationWithLocation
  extends Omit<ObservationType, "location" | "images"> {
  location?: LocationType;
  images?: ObservationImage[] | string[];
}

interface SuggestionType {
  id: number;
  suggested_name: string;
  date: string;
  user: PublicUser;
}

export type {
  ObservationType,
  CategoryType,
  DiscoveryType,
  IsignUp,
  IResponse,
  Icredentials,
  IError,
  ILogInResponse,
  IObservationSavedResponse,
  ObservationPayload,
  IObservationListResponse,
  LocationType,
  ObservationWithLocation,
  SuggestionType,
};
