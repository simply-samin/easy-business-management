import { Head } from '@inertiajs/react';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { edit, index } from '@/routes/products';
import type { BreadcrumbItem, Option } from '@/types';
import ProductForm from './form';
import type { Business, Product, ProductCategory, UnitOfMeasurement } from './types';

export default function ProductsEdit({
    product,
    businesses,
    productCategories,
    unitOfMeasurements,
    statusOptions,
}: {
    product: Product;
    businesses: Business[];
    productCategories: ProductCategory[];
    unitOfMeasurements: UnitOfMeasurement[];
    statusOptions: Option[];
}) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Products', href: index().url },
        { title: 'Edit', href: edit(product.id).url },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Product" />

            <div className="px-4 py-6">
                <div className="mx-auto max-w-4xl space-y-6">
                    <Heading title="Edit Product" className="mb-8" />

                    <ProductForm
                        product={product}
                        businesses={businesses}
                        productCategories={productCategories}
                        unitOfMeasurements={unitOfMeasurements}
                        statusOptions={statusOptions}
                        cancelHref={index().url}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
