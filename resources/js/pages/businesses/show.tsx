import { Head, Link, router, usePage } from '@inertiajs/react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import {
    destroy as businessDestroy,
    edit as businessEdit,
} from '@/actions/App/Http/Controllers/BusinessController';
import {
    create as outletCreate,
    destroy as outletDestroy,
    edit as outletEdit,
} from '@/actions/App/Http/Controllers/OutletController';
import AlertError from '@/components/alert-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type BusinessShowRecord = {
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
    outlets: OutletSummary[];
};

type OutletSummary = {
    id: number;
    name: string;
    outlet_type: string | null;
    code: string | null;
    mobile: string;
    email: string | null;
    district: string | null;
    status: string;
};

export default function BusinessesShow({
    business,
}: {
    business: BusinessShowRecord;
}) {
    const { flash, errors } = usePage<{
        flash: { status?: string };
        errors: Record<string, string>;
    }>().props;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Businesses', href: '/businesses' },
        { title: business.name, href: `/businesses/${business.id}` },
    ];

    function deleteBusiness(): void {
        if (
            !window.confirm(
                'Delete this business? This only succeeds when no outlets are attached.',
            )
        ) {
            return;
        }

        router.visit(businessDestroy(business), {
            method: 'delete',
            preserveScroll: true,
        });
    }

    function deleteOutlet(outlet: OutletSummary): void {
        if (
            !window.confirm(
                `Delete the outlet "${outlet.name}" from this business?`,
            )
        ) {
            return;
        }

        router.visit(outletDestroy({ business, outlet }), {
            method: 'delete',
            preserveScroll: true,
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={business.name} />

            <div className="px-4 py-6">
                <div className="mx-auto max-w-4xl space-y-6">
                    {/* Header with Status and Actions */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="space-y-2">
                            <h1 className="text-2xl font-semibold">
                                {business.name}
                            </h1>
                            <div>
                                <Badge
                                    variant="outline"
                                    className={
                                        business.status === 'active'
                                            ? 'border-transparent bg-blue-100 text-blue-800'
                                            : 'border-transparent bg-gray-300 text-gray-800'
                                    }
                                >
                                    {business.status.charAt(0).toUpperCase() +
                                        business.status.slice(1)}
                                </Badge>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <Button asChild variant="outline">
                                <Link href={businessEdit(business)}>
                                    <Pencil className="size-4" />
                                    Edit
                                </Link>
                            </Button>
                            <Button 
                                variant="ghost" 
                                className="text-destructive hover:bg-destructive/10 hover:text-destructive" 
                                onClick={deleteBusiness}
                            >
                                <Trash2 className="size-4" />
                                Delete
                            </Button>
                        </div>
                    </div>

                    {flash.status && (
                        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                            {flash.status}
                        </div>
                    )}

                    {errors.business && (
                        <AlertError
                            errors={[errors.business]}
                            title="Business deletion blocked."
                        />
                    )}

                    <div className="space-y-6">
                        {/* Business details */}
                        <div>
                            <div className="mb-3 text-base font-medium">
                                Business details
                            </div>
                            <div className="space-y-3">
                                <DetailRow
                                    label="Business name"
                                    value={business.name}
                                />
                                <div className="grid gap-3 md:grid-cols-2">
                                    <DetailRow
                                        label="Trade name"
                                        value={business.trade_name}
                                    />
                                    <DetailRow
                                        label="Business type"
                                        value={humanize(business.business_type)}
                                    />
                                </div>
                                <DetailRow
                                    label="Status"
                                    value={humanize(business.status)}
                                />
                            </div>
                        </div>

                        <hr className="border-t" />

                        {/* Contact */}
                        <div>
                            <div className="mb-3 text-base font-medium">
                                Contact
                            </div>
                            <div className="grid gap-3 md:grid-cols-2">
                                <DetailRow label="Mobile" value={business.mobile} />
                                <DetailRow label="Email" value={business.email} />
                            </div>
                        </div>

                        <hr className="border-t" />

                        {/* Registration */}
                        <div>
                            <div className="mb-3 text-base font-medium">
                                Registration
                            </div>
                            <div className="space-y-3">
                                <DetailRow
                                    label="Trade license no."
                                    value={business.trade_license_no}
                                />
                                <div className="grid gap-3 md:grid-cols-2">
                                    <DetailRow
                                        label="TIN no."
                                        value={business.tin_no}
                                    />
                                    <DetailRow
                                        label="BIN no."
                                        value={business.bin_no}
                                    />
                                </div>
                            </div>
                        </div>

                        <hr className="border-t" />

                        {/* Address */}
                        <div>
                            <div className="mb-3 text-base font-medium">
                                Address
                            </div>
                            <div className="space-y-3">
                                <DetailRow
                                    label="Address line"
                                    value={business.address_line}
                                />
                                <div className="grid gap-3 md:grid-cols-2">
                                    <DetailRow
                                        label="District"
                                        value={business.district}
                                    />
                                    <DetailRow
                                        label="Postal code"
                                        value={business.postal_code}
                                    />
                                </div>
                                <div className="grid gap-3 md:grid-cols-2">
                                    <DetailRow
                                        label="Area type"
                                        value={humanize(business.area_type)}
                                    />
                                    <DetailRow
                                        label="Area name"
                                        value={business.area_name}
                                    />
                                </div>
                            </div>
                        </div>

                        <hr className="border-t" />

                        {/* Outlets */}
                        <div>
                            <div className="mb-3 flex items-center justify-between">
                                <div className="text-base font-medium">
                                    Outlets ({business.outlets.length})
                                </div>
                                <Button asChild size="sm">
                                    <Link href={outletCreate({ business })}>
                                        <Plus className="size-4" />
                                        New Outlet
                                    </Link>
                                </Button>
                            </div>

                            {business.outlets.length === 0 ? (
                                <div className="py-4 text-sm text-muted-foreground">
                                    No outlets yet.
                                </div>
                            ) : (
                                <div className="divide-y">
                                    {business.outlets.map((outlet) => (
                                        <div
                                            key={outlet.id}
                                            className="space-y-2 py-4"
                                        >
                                            {/* Row 1: Name + Type + Status */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium">
                                                        {outlet.name}
                                                    </span>
                                                    <span className="text-sm text-muted-foreground">
                                                        ({outlet.code || 'No code'})
                                                    </span>
                                                    <span className="text-sm text-muted-foreground">
                                                        •{' '}
                                                        {humanize(
                                                            outlet.outlet_type,
                                                        ) || 'No type'}
                                                    </span>
                                                </div>
                                                <Badge
                                                    variant="outline"
                                                    className={
                                                        outlet.status === 'active'
                                                            ? 'border-transparent bg-blue-100 text-blue-800'
                                                            : 'border-transparent bg-gray-300 text-gray-800'
                                                    }
                                                >
                                                    {outlet.status
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        outlet.status.slice(1)}
                                                </Badge>
                                            </div>

                                            {/* Row 2: Mobile */}
                                            <div className="text-sm text-muted-foreground">
                                                Mobile: {outlet.mobile}
                                            </div>

                                            {/* Row 3: Actions */}
                                            <div className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    asChild
                                                >
                                                    <Link
                                                        href={outletEdit({
                                                            business,
                                                            outlet,
                                                        })}
                                                    >
                                                        <Pencil className="mr-1 size-4" />
                                                        Edit
                                                    </Link>
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() =>
                                                        deleteOutlet(outlet)
                                                    }
                                                    className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                                                >
                                                    <Trash2 className="mr-1 size-4" />
                                                    Delete
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </AppLayout>
    );
}

function DetailRow({
    label,
    value,
}: {
    label: string;
    value: string | null | undefined;
}) {
    return (
        <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
            <div className="text-sm text-muted-foreground sm:w-32 sm:shrink-0">
                {label}
            </div>
            <div className="text-sm font-medium">{value || '-'}</div>
        </div>
    );
}

function humanize(value: string | null | undefined): string {
    return value ? value.replaceAll('_', ' ') : '';
}
