import { useEffect, useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    ArrowUpDown,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Plus,
    Search,
} from 'lucide-react';
import {
    create as businessCreate,
    edit as businessEdit,
    show as businessShow,
} from '@/actions/App/Http/Controllers/BusinessController';
import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type BusinessListItem = {
    id: number;
    name: string;
    email: string | null;
    mobile: string;
    status: string;
    outlets_count: number;
};

export default function BusinessesIndex({
    businesses,
    filters,
}: {
    businesses: {
        data: BusinessListItem[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number | null;
        to: number | null;
        prev_page_url: string | null;
        next_page_url: string | null;
        first_page_url: string;
        last_page_url: string;
    };
    filters: {
        search: string | null;
        sort: 'name' | 'created_at';
        direction: 'asc' | 'desc';
    };
}) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Businesses', href: '/businesses' },
        { title: 'List', href: '/businesses' },
    ];

    const { flash } = usePage().props;
    const [search, setSearch] = useState(filters.search ?? '');
    const [sort, setSort] = useState(filters.sort);
    const [direction, setDirection] = useState(filters.direction);

    useEffect(() => {
        setSearch(filters.search ?? '');
        setSort(filters.sort);
        setDirection(filters.direction);
    }, [filters.direction, filters.search, filters.sort]);

    useEffect(() => {
        const timer = window.setTimeout(() => {
            const nextSearch = search.trim();

            if (
                nextSearch === (filters.search ?? '') &&
                sort === filters.sort &&
                direction === filters.direction
            ) {
                return;
            }

            router.get(
                '/businesses',
                {
                    search: nextSearch || undefined,
                    sort,
                    direction,
                    page: 1,
                },
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                },
            );
        }, 300);

        return () => {
            window.clearTimeout(timer);
        };
    }, [
        direction,
        filters.direction,
        filters.search,
        filters.sort,
        search,
        sort,
    ]);

    function handleSortByName() {
        const nextDirection =
            sort === 'name' && direction === 'asc' ? 'desc' : 'asc';

        setSort('name');
        setDirection(nextDirection);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Businesses" />

            <div className="px-4 py-6">
                <div className="mx-auto max-w-7xl space-y-8">

                    <div className="mb-8 flex items-center justify-between">
                        <Heading title="Businesses" />
                        <Button asChild>
                            <Link href={businessCreate()}>
                                <Plus />
                                New Business
                            </Link>
                        </Button>
                    </div>


                    {flash.status && (
                        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
                            {flash.status}
                        </div>
                    )}

                    <section className="space-y-4">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <div className="relative w-full sm:max-w-sm">
                                    <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        type="search"
                                        placeholder="Search businesses..."
                                        className="pl-9"
                                        value={search}
                                        onChange={(event) =>
                                            setSearch(event.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            <div className="overflow-hidden rounded-md border">
                                <div className="overflow-x-auto">
                                    <table className="w-full caption-bottom text-sm">
                                        <thead className="[&_tr]:border-b">
                                            <tr className="border-b transition-colors hover:bg-transparent">
                                                <th className="h-10 px-4 text-left align-middle font-medium">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="-ml-3 h-8 px-3 font-medium"
                                                        onClick={
                                                            handleSortByName
                                                        }
                                                    >
                                                        Name
                                                        <ArrowUpDown className="size-4" />
                                                    </Button>
                                                </th>
                                                <th className="h-10 px-4 text-left align-middle font-medium">
                                                    Mobile
                                                </th>
                                                <th className="h-10 px-4 text-left align-middle font-medium">
                                                    Status
                                                </th>
                                                <th className="h-10 px-4 text-left align-middle font-medium">
                                                    Outlets
                                                </th>
                                                <th className="h-10 px-4 text-right align-middle font-medium">
                                                    <span className="sr-only">
                                                        Actions
                                                    </span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="[&_tr:last-child]:border-0">
                                            {businesses.data.length > 0 ? (
                                                businesses.data.map(
                                                    (business) => (
                                                        <tr
                                                            key={business.id}
                                                            className="border-b transition-colors hover:bg-muted/50"
                                                        >
                                                            <td className="px-4 py-3 align-middle">
                                                                <div className="font-medium">
                                                                    {
                                                                        business.name
                                                                    }
                                                                </div>
                                                                {business.email && (
                                                                    <div className="text-sm text-muted-foreground">
                                                                        {
                                                                            business.email
                                                                        }
                                                                    </div>
                                                                )}
                                                            </td>
                                                            <td className="px-4 py-3 align-middle">
                                                                {
                                                                    business.mobile
                                                                }
                                                            </td>
                                                            <td className="px-4 py-3 align-middle">
                                                                <Badge
                                                                    variant="outline"
                                                                    className={
                                                                        business.status ===
                                                                        'active'
                                                                            ? 'border-transparent bg-blue-100 text-blue-800 hover:bg-blue-100'
                                                                            : 'border-transparent bg-gray-300 text-gray-800 hover:bg-gray-300'
                                                                    }
                                                                >
                                                                    {business.status
                                                                        .charAt(
                                                                            0,
                                                                        )
                                                                        .toUpperCase() +
                                                                        business.status.slice(
                                                                            1,
                                                                        )}
                                                                </Badge>
                                                            </td>
                                                            <td className="px-4 py-3 align-middle">
                                                                {
                                                                    business.outlets_count
                                                                }
                                                            </td>
                                                            <td className="px-4 py-3 text-right align-middle">
                                                                <div className="flex justify-end gap-3">
                                                                    <Link
                                                                        className="text-primary underline-offset-4 hover:underline"
                                                                        href={businessShow(
                                                                            business,
                                                                        )}
                                                                    >
                                                                        View
                                                                    </Link>
                                                                    <Link
                                                                        className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                                                                        href={businessEdit(
                                                                            business,
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
                                                        colSpan={5}
                                                        className="h-24 px-4 text-center align-middle text-sm text-muted-foreground"
                                                    >
                                                        {search.trim()
                                                            ? 'No businesses found.'
                                                            : 'No businesses yet.'}
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div className="text-sm text-muted-foreground">
                                    {businesses.total > 0
                                        ? `Showing ${businesses.from}-${businesses.to} of ${businesses.total} businesses`
                                        : 'Showing 0 businesses'}
                                </div>

                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end">
                                    <div className="text-sm font-medium">
                                        Page {businesses.current_page} of{' '}
                                        {businesses.last_page}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {businesses.current_page > 1 ? (
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="hidden size-8 lg:inline-flex"
                                                asChild
                                            >
                                                <Link
                                                    href={
                                                        businesses.first_page_url
                                                    }
                                                    preserveScroll
                                                >
                                                    <ChevronsLeft />
                                                    <span className="sr-only">
                                                        First page
                                                    </span>
                                                </Link>
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="hidden size-8 lg:inline-flex"
                                                disabled
                                            >
                                                <ChevronsLeft />
                                                <span className="sr-only">
                                                    First page
                                                </span>
                                            </Button>
                                        )}
                                        {businesses.prev_page_url ? (
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="size-8"
                                                asChild
                                            >
                                                <Link
                                                    href={
                                                        businesses.prev_page_url
                                                    }
                                                    preserveScroll
                                                >
                                                    <ChevronLeft />
                                                    <span className="sr-only">
                                                        Previous page
                                                    </span>
                                                </Link>
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="size-8"
                                                disabled
                                            >
                                                <ChevronLeft />
                                                <span className="sr-only">
                                                    Previous page
                                                </span>
                                            </Button>
                                        )}
                                        {businesses.next_page_url ? (
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="size-8"
                                                asChild
                                            >
                                                <Link
                                                    href={
                                                        businesses.next_page_url
                                                    }
                                                    preserveScroll
                                                >
                                                    <ChevronRight />
                                                    <span className="sr-only">
                                                        Next page
                                                    </span>
                                                </Link>
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="size-8"
                                                disabled
                                            >
                                                <ChevronRight />
                                                <span className="sr-only">
                                                    Next page
                                                </span>
                                            </Button>
                                        )}
                                        {businesses.next_page_url ? (
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="hidden size-8 lg:inline-flex"
                                                asChild
                                            >
                                                <Link
                                                    href={
                                                        businesses.last_page_url
                                                    }
                                                    preserveScroll
                                                >
                                                    <ChevronsRight />
                                                    <span className="sr-only">
                                                        Last page
                                                    </span>
                                                </Link>
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="hidden size-8 lg:inline-flex"
                                                disabled
                                            >
                                                <ChevronsRight />
                                                <span className="sr-only">
                                                    Last page
                                                </span>
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}
