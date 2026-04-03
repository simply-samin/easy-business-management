import { Head } from '@inertiajs/react';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import BusinessForm from './form';
import type { Option } from './types';

export default function BusinessesCreate({
    businessTypeOptions,
    statusOptions,
    areaTypeOptions,
}: {
    businessTypeOptions: Option[];
    statusOptions: Option[];
    areaTypeOptions: Option[];
}) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Businesses', href: '/businesses' },
        { title: 'Create', href: '/businesses/create' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Business" />

            <div className="px-4 py-6">
                <div className="mx-auto max-w-4xl space-y-6">
                    <Heading title="Create Business" />

                    <BusinessForm
                        businessTypeOptions={businessTypeOptions}
                        statusOptions={statusOptions}
                        areaTypeOptions={areaTypeOptions}
                        cancelHref="/businesses"
                    />
                </div>
            </div>
        </AppLayout>
    );
}
