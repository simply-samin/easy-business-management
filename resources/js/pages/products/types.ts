type Business = {
    id: number;
    name: string;
};

type ProductCategory = {
    id: number;
    business_id: number;
    name: string;
    business?: Business;
};

type UnitOfMeasurement = {
    id: number;
    name: string;
    code: string;
};

type Product = {
    id: number;
    business_id: number;
    product_category_id: number;
    name: string;
    brand: string | null;
    gsm: number | null;
    size_label: string | null;
    base_unit_of_measurement_id: number;
    sku: string | null;
    description: string | null;
    status: string;
    status_label: string | null;
    business: Business;
    category: ProductCategory;
    base_unit_of_measurement?: UnitOfMeasurement;
};

export type { Business, ProductCategory, UnitOfMeasurement, Product };
