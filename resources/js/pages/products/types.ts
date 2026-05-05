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

type ProductUnitConversion = {
    id: number;
    product_id: number;
    unit_of_measurement_id: number;
    conversion_factor_to_base: string;
    is_base_unit: boolean;
    is_default_purchase_unit: boolean;
    is_default_sale_unit: boolean;
    status: string;
    unit_of_measurement: UnitOfMeasurement;
};

type ProductUnitConversionFormData = {
    unit_of_measurement_id: string;
    conversion_factor_to_base: string;
    is_default_purchase_unit: boolean;
    is_default_sale_unit: boolean;
    status: string;
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
    base_unit_of_measurement: UnitOfMeasurement;
    unit_conversions?: ProductUnitConversion[];
};

export type {
    Business,
    Product,
    ProductCategory,
    ProductUnitConversion,
    ProductUnitConversionFormData,
    UnitOfMeasurement,
};
