import { Head } from '@inertiajs/react';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { index, show } from '@/routes/businesses';
import { create } from '@/routes/businesses/outlets';
import type { BreadcrumbItem } from '@/types';
import OutletForm from './form';
import type { BusinessContext, Option } from './types';

export default function OutletsCreate({
    business,
    outletTypeOptions,
    statusOptions,
    areaTypeOptions,
}: {
    business: BusinessContext;
    outletTypeOptions: Option[];
    statusOptions: Option[];
    areaTypeOptions: Option[];
}) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Businesses', href: index.url() },
        { title: business.name, href: show.url(business.id) },
        {
            title: 'Create Outlet',
            href: create.url(business.id),
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
                        cancelHref={show.url(business.id)}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
