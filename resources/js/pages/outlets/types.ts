type Business = {
    id: number;
    name: string;
};

type Outlet = {
    id: number;
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
};

export type { Business, Outlet };
