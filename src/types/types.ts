type CategoryType = 'fauna' | 'flora' | 'funga';
type DiscoveryType = 'domestic' | 'wildlife';

type ObservationType = {
    id: number;
    scientific_name: string;
    common_name: string;
    description: string;
    date: string;
    location: string;
    coordinates?: {
        lat: number;
        lng: number;
    };
    images: string[];
    public: boolean;
    identified: boolean;
    category: CategoryType;
    discovery: DiscoveryType
};

export type { ObservationType, CategoryType, DiscoveryType };