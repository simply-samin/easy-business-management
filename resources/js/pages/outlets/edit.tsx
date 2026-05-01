import { Head } from '@inertiajs/react';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { index, show } from '@/routes/businesses';
import { edit } from '@/routes/businesses/outlets';
import type { BreadcrumbItem } from '@/types';
import OutletForm from './form';
import type { Business, Option, Outlet } from './types';

export default function OutletsEdit({
    business,
    outlet,
    outletTypeOptions,
    statusOptions,
    areaTypeOptions,
}: {
    business: Business;
    outlet: Outlet;
    outletTypeOptions: Option[];
    statusOptions: Option[];
    areaTypeOptions: Option[];
}) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Businesses', href: index().url },
        { title: business.name, href: show(business.id).url },
        {
            title: 'Edit Outlet',
            href: edit({ business, outlet }).url,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Outlet" />

            <div className="px-4 py-6">
                <div className="mx-auto max-w-4xl space-y-6">
                    <Heading title="Edit Outlet" className="mb-8" />

                    <OutletForm
                        business={business}
                        outlet={outlet}
                        outletTypeOptions={outletTypeOptions}
                        statusOptions={statusOptions}
                        areaTypeOptions={areaTypeOptions}
                        cancelHref={show(business.id).url}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
