import { Head, Link, router } from '@inertiajs/react';
import { ArrowUpDown, Plus, Search } from 'lucide-react';
import { useRef } from 'react';
import Heading from '@/components/heading';
import PaginationLinks from '@/components/pagination-links';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { create, edit, index, show } from '@/routes/purchases';
import type { BreadcrumbItem, LengthAwarePagination } from '@/types';
import type { Purchase } from './types';

type QueryString = {
    search: string | null;
    sort: 'purchase_no' | 'purchase_date' | 'total_amount' | 'paid_amount' | 'due_amount';
    direction: 'asc' | 'desc';
};

function formatCurrency(value: string | number) {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return num.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

function formatDate(date: string) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

export default function PurchasesIndex({
    purchases,
    queryString,
}: {
    purchases: LengthAwarePagination<Purchase>;
    queryString: QueryString;
}) {
    const searchTimeout = useRef<number | undefined>(undefined);
    const reloadProps = ['purchases', 'queryString'];

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Purchases', href: index().url },
        { title: 'List', href: index().url },
    ];

    const makeSortDirection = (column: QueryString['sort']) =>
        queryString.sort === column && queryString.direction === 'asc'
            ? 'desc'
            : 'asc';

    const makeSortLink = (column: QueryString['sort']) =>
        index({
            query: {
                search: queryString.search ?? undefined,
                sort: column,
                direction: makeSortDirection(column),
                page: 1,
            },
        });

    const hasPages = purchases.last_page > 1;
    const sortedColumn = queryString.sort;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Purchases" />

            <div className="px-4 py-6">
                <div className="mx-auto max-w-7xl space-y-8">
                    <div className="mb-8 flex items-center justify-between">
                        <Heading title="Purchases" />
                        <Button asChild>
                            <Link href={create()}>
                                <Plus />
                                New Purchase
                            </Link>
                        </Button>
                    </div>

                    <section className="space-y-4">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <div className="relative w-full sm:max-w-sm">
                                    <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        type="search"
                                        placeholder="Search purchase no..."
                                        className="pl-9"
                                        defaultValue={queryString.search ?? ''}
                                        onChange={(event) => {
                                            const search =
                                                event.currentTarget.value.trim();

                                            window.clearTimeout(
                                                searchTimeout.current,
                                            );

                                            searchTimeout.current =
                                                window.setTimeout(() => {
                                                    router.get(
                                                        index().url,
                                                        {
                                                            search:
                                                                search ||
                                                                undefined,
                                                            sort: queryString.sort,
                                                            direction:
                                                                queryString.direction,
                                                            page: 1,
                                                        },
                                                        {
                                                            preserveScroll: true,
                                                            preserveState: true,
                                                            replace: true,
                                                            only: reloadProps,
                                                        },
                                                    );
                                                }, 300);
                                        }}
                                    />
                                </div>

                                {queryString.search && (
                                    <Button variant="outline" asChild>
                                        <Link
                                            href={index()}
                                            preserveScroll
                                            only={reloadProps}
                                        >
                                            Clear
                                        </Link>
                                    </Button>
                                )}
                            </div>

                            <div className="overflow-hidden rounded-md border">
                                <div className="overflow-x-auto">
                                    <table className="w-full caption-bottom text-sm">
                                        <thead className="[&_tr]:border-b">
                                            <tr className="border-b transition-colors hover:bg-transparent">
                                                <th className="h-10 px-3 text-left align-middle font-medium">
                                                    <SortHeader
                                                        column="purchase_no"
                                                        label="Purchase No"
                                                        active={sortedColumn}
                                                        href={makeSortLink(
                                                            'purchase_no',
                                                        )}
                                                        reloadProps={
                                                            reloadProps
                                                        }
                                                    />
                                                </th>
                                                <th className="h-10 px-3 text-left align-middle font-medium">
                                                    <SortHeader
                                                        column="purchase_date"
                                                        label="Date"
                                                        active={sortedColumn}
                                                        href={makeSortLink(
                                                            'purchase_date',
                                                        )}
                                                        reloadProps={
                                                            reloadProps
                                                        }
                                                    />
                                                </th>
                                                <th className="h-10 px-3 text-left align-middle font-medium">
                                                    Supplier
                                                </th>
                                                <th className="h-10 px-3 text-left align-middle font-medium">
                                                    Outlet
                                                </th>
                                                <th className="h-10 px-3 text-right align-middle font-medium">
                                                    <SortHeader
                                                        column="total_amount"
                                                        label="Total"
                                                        active={sortedColumn}
                                                        href={makeSortLink(
                                                            'total_amount',
                                                        )}
                                                        reloadProps={
                                                            reloadProps
                                                        }
                                                    />
                                                </th>
                                                <th className="h-10 px-3 text-right align-middle font-medium">
                                                    <SortHeader
                                                        column="paid_amount"
                                                        label="Paid"
                                                        active={sortedColumn}
                                                        href={makeSortLink(
                                                            'paid_amount',
                                                        )}
                                                        reloadProps={
                                                            reloadProps
                                                        }
                                                    />
                                                </th>
                                                <th className="h-10 px-3 text-right align-middle font-medium">
                                                    <SortHeader
                                                        column="due_amount"
                                                        label="Due"
                                                        active={sortedColumn}
                                                        href={makeSortLink(
                                                            'due_amount',
                                                        )}
                                                        reloadProps={
                                                            reloadProps
                                                        }
                                                    />
                                                </th>
                                                <th className="h-10 px-3 text-center align-middle font-medium">
                                                    Payment Status
                                                </th>
                                                <th className="h-10 px-3 text-left align-middle font-medium">
                                                    Created By
                                                </th>
                                                <th className="h-10 px-3 text-right align-middle font-medium">
                                                    <span className="sr-only">
                                                        Actions
                                                    </span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="[&_tr:last-child]:border-0">
                                            {purchases.data.length > 0 ? (
                                                purchases.data.map(
                                                    (purchase) => (
                                                        <tr
                                                            key={purchase.id}
                                                            className="border-b transition-colors hover:bg-muted/50"
                                                        >
                                                            <td className="px-3 py-3 align-middle font-medium">
                                                                {
                                                                    purchase.purchase_no
                                                                }
                                                            </td>
                                                            <td className="px-3 py-3 text-nowrap align-middle">
                                                                {formatDate(
                                                                    purchase.purchase_date,
                                                                )}
                                                            </td>
                                                            <td className="px-3 py-3 align-middle">
                                                                {purchase
                                                                    .supplier
                                                                    ?.name ??
                                                                    '-'}
                                                            </td>
                                                            <td className="px-3 py-3 align-middle">
                                                                {purchase.outlet
                                                                    ?.name ??
                                                                    '-'}
                                                            </td>
                                                            <td className="px-3 py-3 text-right align-middle tabular-nums">
                                                                {formatCurrency(
                                                                    purchase.total_amount,
                                                                )}
                                                            </td>
                                                            <td className="px-3 py-3 text-right align-middle tabular-nums">
                                                                {formatCurrency(
                                                                    purchase.paid_amount,
                                                                )}
                                                            </td>
                                                            <td className="px-3 py-3 text-right align-middle tabular-nums">
                                                                {formatCurrency(
                                                                    purchase.due_amount,
                                                                )}
                                                            </td>
                                                            <td className="px-3 py-3 text-center align-middle">
                                                                <Badge
                                                                    variant="outline"
                                                                    className={
                                                                        purchase.payment_status ===
                                                                        'paid'
                                                                            ? 'border-transparent bg-emerald-100 text-emerald-800'
                                                                            : purchase.payment_status ===
                                                                                'partial'
                                                                              ? 'border-transparent bg-amber-100 text-amber-800'
                                                                              : 'border-transparent bg-red-100 text-red-800'
                                                                    }
                                                                >
                                                                    {purchase.payment_status_label ??
                                                                        purchase.payment_status}
                                                                </Badge>
                                                            </td>
                                                            <td className="px-3 py-3 align-middle">
                                                                {purchase.user
                                                                    ?.name ??
                                                                    '-'}
                                                            </td>
                                                            <td className="px-3 py-3 text-right align-middle">
                                                                <div className="flex justify-end gap-3">
                                                                    <Link
                                                                        className="text-primary underline-offset-4 hover:underline"
                                                                        href={show(
                                                                            purchase.id,
                                                                        )}
                                                                    >
                                                                        View
                                                                    </Link>
                                                                    <Link
                                                                        className="text-primary underline-offset-4 hover:underline"
                                                                        href={edit(
                                                                            purchase.id,
                                                                        )}
                                                                    >
                                                                        Edit
                                                                    </Link>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ),
                                                )
                                            ) : (
                                                <tr>
                                                    <td
                                                        colSpan={10}
                                                        className="h-24 px-4 text-center align-middle text-sm text-muted-foreground"
                                                    >
                                                        {queryString.search
                                                            ? 'No purchases found.'
                                                            : 'No purchases yet.'}
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {hasPages && (
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="text-sm text-muted-foreground sm:shrink-0 sm:whitespace-nowrap">
                                        {`Showing ${purchases.from}-${purchases.to} of ${purchases.total} purchases`}
                                    </div>

                                    <PaginationLinks
                                        links={purchases.links}
                                        only={reloadProps}
                                        className="mx-0 w-auto justify-start sm:justify-end"
                                    />
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}

function SortHeader({
    column,
    label,
    active,
    href,
    reloadProps,
}: {
    column: string;
    label: string;
    active: string;
    href: ReturnType<typeof index>;
    reloadProps: string[];
}) {
    return (
        <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 px-3 font-medium"
            asChild
        >
            <Link href={href} preserveScroll only={reloadProps}>
                {label}
                <ArrowUpDown className="size-4" />
            </Link>
        </Button>
    );
}
