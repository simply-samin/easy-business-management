import { Head } from '@inertiajs/react';
import Heading from '@/components/heading';
import OutletForm from '@/components/outlet-form';
import { Card, CardContent } from '@/components/ui/card';
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

            <div className="space-y-6 p-4">
                <Heading
                    title={`Create Outlet for ${business.name}`}
                    description="Add a branch, shopfront, office, warehouse, or online outlet under this business."
                />

                <Card className="border-none bg-transparent p-0 shadow-none">
                    <CardContent className="px-0">
                        <OutletForm
                            business={business}
                            outletTypeOptions={outletTypeOptions}
                            statusOptions={statusOptions}
                            areaTypeOptions={areaTypeOptions}
                            cancelHref={`/businesses/${business.id}`}
                        />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
