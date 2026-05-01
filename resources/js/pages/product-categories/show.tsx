import { Form, Head, Link, usePage } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';
import ProductCategoryController from '@/actions/App/Http/Controllers/ProductCategoryController';
import AlertError from '@/components/alert-error';
import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import {
    edit as productCategoryEdit,
    index as productCategoryIndex,
    show as productCategoryShow,
} from '@/routes/product-categories';
import type { BreadcrumbItem } from '@/types';
import type { ProductCategory } from './types';

export default function ProductCategoriesShow({
    productCategory,
}: {
    productCategory: ProductCategory;
}) {
    const { flash, errors } = usePage<{
        flash: { status?: string };
        errors: Record<string, string>;
    }>().props;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Product Categories', href: productCategoryIndex().url },
        { title: 'View', href: productCategoryShow(productCategory.id).url },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={productCategory.name} />

            <div className="px-4 py-6">
                <div className="mx-auto max-w-4xl space-y-6">
                    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <Heading title={productCategory.name} />

                        <div className="flex gap-2">
                            <Button asChild variant="outline">
                                <Link
                                    href={productCategoryEdit(
                                        productCategory.id,
                                    ).url}
                                >
                                    <Pencil className="size-4" />
                                    Edit
                                </Link>
                            </Button>

                            <Form
                                action={ProductCategoryController.destroy(
                                    productCategory.id,
                                )}
                                options={{ preserveScroll: true }}
                                onBefore={() =>
                                    window.confirm(
                                        'Delete this product category? This only succeeds when no products are attached.',
                                    )
                                }
                            >
                                {({ processing }) => (
                                    <Button
                                        type="submit"
                                        variant="ghost"
                                        disabled={processing}
                                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                                    >
                                        <Trash2 className="size-4" />
                                        Delete
                                    </Button>
                                )}
                            </Form>
                        </div>
                    </div>

                    {flash.status && (
                        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                            {flash.status}
                        </div>
                    )}

                    {errors.productCategory && (
                        <AlertError
                            errors={[errors.productCategory]}
                            title="Product category deletion blocked."
                        />
                    )}

                    <div className="space-y-6">
                        <div className="space-y-3">
                                <TextEntry
                                    label="Category name"
                                    value={productCategory.name}
                                />
                                <TextEntry
                                    label="Business"
                                    value={
                                        productCategory.business?.name ?? null
                                    }
                                />
                                <TextEntry
                                    label="Description"
                                    value={productCategory.description}
                                />
                                <TextEntry
                                    label="Status"
                                    value={humanize(productCategory.status)}
                                    badge
                                    color={
                                        productCategory.status === 'active'
                                            ? 'success'
                                            : 'gray'
                                    }
                                />
                            </div>

                        <hr className="border-t" />

                        <div>
                            <div className="mb-3 text-base font-medium">
                                Products ({productCategory.products_count ?? 0})
                            </div>

                            {(productCategory.products ?? []).length === 0 ? (
                                <div className="py-4 text-sm text-muted-foreground">
                                    No products yet.
                                </div>
                            ) : (
                                <div className="divide-y">
                                    {(productCategory.products ?? []).map(
                                        (product) => (
                                            <div
                                                key={product.id}
                                                className="flex items-center justify-between py-4"
                                            >
                                                <div className="font-medium">
                                                    {product.name}
                                                </div>
                                            </div>
                                        ),
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

function TextEntry({
    label,
    value,
    badge = false,
    color = 'gray',
}: {
    label: string;
    value: string | null | undefined;
    badge?: boolean;
    color?: 'gray' | 'blue' | 'success' | 'danger' | 'warning';
}) {
    const colorClasses: Record<string, string> = {
        gray: 'border-transparent bg-gray-100 text-gray-800',
        blue: 'border-transparent bg-blue-100 text-blue-800',
        success: 'border-transparent bg-emerald-100 text-emerald-800',
        danger: 'border-transparent bg-red-100 text-red-800',
        warning: 'border-transparent bg-amber-100 text-amber-800',
    };

    const content = badge ? (
        <Badge variant="outline" className={colorClasses[color]}>
            {value || '-'}
        </Badge>
    ) : (
        value || '-'
    );

    return (
        <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
            <div className="text-sm text-muted-foreground sm:w-32 sm:shrink-0">
                {label}
            </div>
            <div className="text-sm font-medium">{content}</div>
        </div>
    );
}

function humanize(value: string | null | undefined): string {
    return value ? value.replaceAll('_', ' ') : '';
}
