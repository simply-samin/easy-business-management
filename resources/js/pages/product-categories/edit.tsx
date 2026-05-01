import { Head, Link } from '@inertiajs/react';
import { Eye } from 'lucide-react';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { edit, index, show } from '@/routes/product-categories';
import type { BreadcrumbItem } from '@/types';
import ProductCategoryForm from './form';
import type { Business, Option, ProductCategory } from './types';

export default function ProductCategoriesEdit({
    productCategory,
    businesses,
    statusOptions,
}: {
    productCategory: ProductCategory;
    businesses: Business[];
    statusOptions: Option[];
}) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Product Categories', href: index().url },
        { title: 'Edit', href: edit(productCategory.id).url },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Product Category" />

            <div className="px-4 py-6">
                <div className="mx-auto max-w-4xl space-y-6">
                    <div className="mb-8 flex items-start justify-between gap-4">
                        <Heading title="Edit Product Category" />

                        <Button variant="outline" asChild>
                            <Link href={show(productCategory.id).url}>
                                <Eye />
                                View
                            </Link>
                        </Button>
                    </div>

                    <ProductCategoryForm
                        productCategory={productCategory}
                        businesses={businesses}
                        statusOptions={statusOptions}
                        cancelHref={edit(productCategory.id).url}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
