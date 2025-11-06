type CategoryType = "fauna" | "flora" | "funga";
type DiscoveryType = "domestic" | "wildlife";

type ObservationType = {
  id: number;
  scientific_name: string;
  common_name: string;
  description: string;
  date: string;
  location: string;
  images: string[];
  public: boolean;
  identified: boolean;
  category: CategoryType;
  discovery: DiscoveryType;
};

interface IsignUp {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface IResponse {
  accessToken: string;
  email: string;
  firstName: string;
  status: number;
  msg: string;
}

interface Icredentials {
  email: string;
  password: string;
}

export type {
  ObservationType,
  CategoryType,
  DiscoveryType,
  IsignUp,
  IResponse,
  Icredentials,
};
