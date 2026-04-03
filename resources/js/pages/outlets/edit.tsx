import { Head } from '@inertiajs/react';
import Heading from '@/components/heading';
import OutletForm from '@/components/outlet-form';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

export default function OutletsEdit({
    business,
    outlet,
    outletTypeOptions,
    statusOptions,
    areaTypeOptions,
}: {
    business: { id: number; name: string };
    outlet: {
        id: number;
        name: string;
        code: string | null;
        mobile: string;
        email: string | null;
        outlet_type: string | null;
        address_line: string | null;
        district: string | null;
        area_type: string | null;
        area_name: string | null;
        postal_code: string | null;
        status: string;
    };
    outletTypeOptions: Array<{ label: string; value: string }>;
    statusOptions: Array<{ label: string; value: string }>;
    areaTypeOptions: Array<{ label: string; value: string }>;
}) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Businesses', href: '/businesses' },
        { title: business.name, href: `/businesses/${business.id}` },
        {
            title: 'Edit Outlet',
            href: `/businesses/${business.id}/outlets/${outlet.id}/edit`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Outlet" />

            <div className="space-y-6 p-4">
                <Heading
                    title={`Edit ${outlet.name}`}
                    description={`Update the outlet record for ${business.name}.`}
                />

                <Card className="border-none bg-transparent p-0 shadow-none">
                    <CardContent className="px-0">
                        <OutletForm
                            business={business}
                            outlet={outlet}
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
