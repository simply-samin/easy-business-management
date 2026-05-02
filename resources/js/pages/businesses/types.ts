type Outlet = {
    id: number;
    business_id?: number;
    name: string;
    code: string | null;
    mobile: string;
    email: string | null;
    outlet_type: string | null;
    address_line: string | null;
    district: string | null;
    area_type: string | null;
    area_name: string | null;
    postal_code: string | null;
    status: string;
    outlet_type_label: string | null;
    area_type_label: string | null;
    status_label: string | null;
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
    business_type_label: string | null;
    area_type_label: string | null;
    status_label: string | null;
    outlets_count?: number;
    outlets?: Outlet[];
};

export type { Business, Outlet };
