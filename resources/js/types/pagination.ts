export type LengthAwarePaginationLink = {
    url: string | null;
    label: string;
    page?: number | null;
    active: boolean;
};

export type LengthAwarePagination<TItem> = {
    current_page: number;
    data: TItem[];
    first_page_url: string;
    from: number | null;
    last_page: number;
    last_page_url: string;
    links: LengthAwarePaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number | null;
    total: number;
};
