export type Business = {
    id: number;
    name: string;
};

export type Party = {
    id: number;
    business_id: number;
    name: string;
    trade_name: string | null;
    mobile: string | null;
    email: string | null;
    party_type: string;
    address_line: string | null;
    district: string | null;
    area_type: string | null;
    area_name: string | null;
    postal_code: string | null;
    opening_balance: string | null;
    opening_balance_type: string;
    credit_limit: string | null;
    status: string;
    party_type_label: string | null;
    opening_balance_type_label: string | null;
    area_type_label: string | null;
    status_label: string | null;
    business?: Business;
    contact_persons?: PartyContactPerson[];
};

export type PartyContactPerson = {
    id: number;
    party_id: number;
    name: string;
    designation: string | null;
    mobile: string | null;
    email: string | null;
    is_primary: boolean;
    note: string | null;
    status: string;
    status_label: string | null;
};
