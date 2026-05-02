type Business = {
    id: number;
    name: string;
};

type ProductCategory = {
    id: number;
    business_id: number;
    name: string;
    description: string | null;
    status: string;
    status_label: string | null;
    products_count?: number;
    business?: Business;
};

export type { Business, ProductCategory };
