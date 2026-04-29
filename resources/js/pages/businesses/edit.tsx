import { Head, Link } from '@inertiajs/react';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Eye } from 'lucide-react';
import BusinessForm from './form';
import type { Business, Option } from './types';
import { index, edit, show } from '@/routes/businesses';

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
        { title: 'Businesses', href: index.url() },
        { title: business.name, href: edit.url(business.id) },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Business" />

            <div className="px-4 py-6">
                <div className="mx-auto max-w-4xl space-y-6">
                    <div className="flex items-start justify-between gap-4">
                        <Heading title="Edit Business" />

                        <Button variant="outline" asChild>
                            <Link href={show.url(business.id)}>
                                <Eye />
                                View
                            </Link>
                        </Button>
                    </div>

                    <BusinessForm
                        business={business}
                        businessTypeOptions={businessTypeOptions}
                        statusOptions={statusOptions}
                        areaTypeOptions={areaTypeOptions}
                        cancelHref={edit.url(business.id)}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
