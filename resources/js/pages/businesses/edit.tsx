import { Head } from '@inertiajs/react';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import BusinessForm from './form';
import type { Business, Option } from './types';

export default function BusinessesEdit({
    business,
    businessTypeOptions,
    statusOptions,
    areaTypeOptions,
}: {
    business: Business;
    businessTypeOptions: Option[];
    statusOptions: Option[];
    areaTypeOptions: Option[];
}) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Businesses', href: '/businesses' },
        { title: 'Edit', href: `/businesses/${business.id}/edit` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Business" />

            <div className="px-4 py-6">
                <div className="mx-auto max-w-4xl space-y-6">
                    <Heading title="Edit Business" />

                    <BusinessForm
                        business={business}
                        businessTypeOptions={businessTypeOptions}
                        statusOptions={statusOptions}
                        areaTypeOptions={areaTypeOptions}
                        cancelHref={`/businesses/${business.id}`}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
