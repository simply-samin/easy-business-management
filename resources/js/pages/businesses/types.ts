type Option = {
    label: string;
    value: string;
};

type Business = {
    id: number;
    name: string;
    trade_name: string | null;
    business_type: string;
    mobile: string;
    email: string | null;
    trade_license_no: string | null;
    tin_no: string | null;
    bin_no: string | null;
    address_line: string | null;
    district: string | null;
    area_type: string | null;
    area_name: string | null;
    postal_code: string | null;
    status: string;
};

type BusinessFormData = {
    name: string;
    trade_name: string;
    business_type: string;
    mobile: string;
    email: string;
    trade_license_no: string;
    tin_no: string;
    bin_no: string;
    address_line: string;
    district: string;
    area_type: string;
    area_name: string;
    postal_code: string;
    status: string;
};

export type { Option, Business, BusinessFormData };
