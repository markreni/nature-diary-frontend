type ObservationType = {
    id: number;
    scientific_name: string;
    common_name: string;
    description: string;
    date: string;
    location: string;
    image?: string;
    identified: boolean;
};

export type { ObservationType };