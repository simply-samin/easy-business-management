import { Head } from '@inertiajs/react';
import Heading from '@/components/heading';
import OutletForm from '@/components/outlet-form';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

export default function OutletsCreate({
    business,
    outletTypeOptions,
    statusOptions,
    areaTypeOptions,
}: {
    business: { id: number; name: string };
    outletTypeOptions: Array<{ label: string; value: string }>;
    statusOptions: Array<{ label: string; value: string }>;
    areaTypeOptions: Array<{ label: string; value: string }>;
}) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Businesses', href: '/businesses' },
        { title: business.name, href: `/businesses/${business.id}` },
        {
            title: 'Create Outlet',
            href: `/businesses/${business.id}/outlets/create`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Outlet" />

            <div className="px-4 py-6">
                <div className="mx-auto max-w-4xl space-y-6">
                    <Heading title="Create Outlet" />

                    <OutletForm
                        business={business}
                        outletTypeOptions={outletTypeOptions}
                        statusOptions={statusOptions}
                        areaTypeOptions={areaTypeOptions}
                        cancelHref={`/businesses/${business.id}`}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
