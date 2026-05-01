import { Head, Link } from '@inertiajs/react';
import { Eye } from 'lucide-react';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { edit, index, show } from '@/routes/businesses';
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
        { title: 'Businesses', href: index().url },
        { title: 'Edit', href: edit(business.id).url },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Business" />

            <div className="px-4 py-6">
                <div className="mx-auto max-w-4xl space-y-6">
                    <div className="mb-8 flex items-start justify-between gap-4">
                        <Heading title="Edit Business" />

                        <Button variant="outline" asChild>
                            <Link href={show(business.id).url}>
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
                        cancelHref={edit(business.id).url}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
