import { Form, Link } from '@inertiajs/react';
import { Save, X } from 'lucide-react';
import { useState } from 'react';
import ProductController from '@/actions/App/Http/Controllers/ProductController';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from '@/components/ui/combobox';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import type { Option } from '@/types';
import type { Business, Product, ProductCategory, UnitOfMeasurement } from './types';

export default function ProductForm({
    product,
    businesses,
    productCategories,
    unitOfMeasurements,
    statusOptions,
    cancelHref,
}: {
    product?: Product;
    businesses: Business[];
    productCategories: ProductCategory[];
    unitOfMeasurements: UnitOfMeasurement[];
    statusOptions: Option[];
    cancelHref: string;
}) {
    const [status, setStatus] = useState(product?.status ?? 'active');

    const businessOptions: Option[] = businesses.map((business) => ({
        label: business.name,
        value: business.id.toString(),
    }));

    const categoryOptions: Option[] = productCategories.map((category) => ({
        label: category.name,
        value: category.id.toString(),
    }));

    const unitOptions: Option[] = unitOfMeasurements.map((unit) => ({
        label: unit.name,
        value: unit.id.toString(),
    }));

    const selectedBusiness =
        businessOptions.find(
            (business) => business.value === product?.business_id?.toString(),
        ) ?? null;

    const selectedCategory =
        categoryOptions.find(
            (category) => category.value === product?.product_category_id?.toString(),
        ) ?? null;

    const selectedUnit =
        unitOptions.find(
            (unit) => unit.value === product?.base_unit_of_measurement_id?.toString(),
        ) ?? null;

    return (
        <Form
            action={
                product
                    ? ProductController.update(product.id)
                    : ProductController.store()
            }
            options={{ preserveScroll: true }}
            disableWhileProcessing
            className="space-y-6"
        >
            {({ errors, processing }) => (
                <div className="space-y-6">
                    <div className="flex flex-col gap-7">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="business_id"
                                    className="text-sm font-medium"
                                >
                                    Business{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <Combobox
                                    name="business_id"
                                    items={businessOptions}
                                    defaultValue={selectedBusiness}
                                    itemToStringValue={(business) => business.value}
                                >
                                    <ComboboxInput
                                        id="business_id"
                                        placeholder="Select business"
                                        aria-invalid={Boolean(errors.business_id)}
                                        className="w-full"
                                    />
                                    <ComboboxContent>
                                        <ComboboxEmpty>
                                            No business found.
                                        </ComboboxEmpty>
                                        <ComboboxList>
                                            {(business) => (
                                                <ComboboxItem
                                                    key={business.value}
                                                    value={business}
                                                >
                                                    {business.label}
                                                </ComboboxItem>
                                            )}
                                        </ComboboxList>
                                    </ComboboxContent>
                                </Combobox>
                                <InputError message={errors.business_id} />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="product_category_id"
                                    className="text-sm font-medium"
                                >
                                    Product Category{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <Combobox
                                    name="product_category_id"
                                    items={categoryOptions}
                                    defaultValue={selectedCategory}
                                    itemToStringValue={(category) => category.value}
                                >
                                    <ComboboxInput
                                        id="product_category_id"
                                        placeholder="Select category"
                                        aria-invalid={Boolean(
                                            errors.product_category_id,
                                        )}
                                        className="w-full"
                                    />
                                    <ComboboxContent>
                                        <ComboboxEmpty>
                                            No category found.
                                        </ComboboxEmpty>
                                        <ComboboxList>
                                            {(category) => (
                                                <ComboboxItem
                                                    key={category.value}
                                                    value={category}
                                                >
                                                    {category.label}
                                                </ComboboxItem>
                                            )}
                                        </ComboboxList>
                                    </ComboboxContent>
                                </Combobox>
                                <InputError
                                    message={errors.product_category_id}
                                />
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="base_unit_of_measurement_id"
                                    className="text-sm font-medium"
                                >
                                    Base Unit of Measurement{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <Combobox
                                    name="base_unit_of_measurement_id"
                                    items={unitOptions}
                                    defaultValue={selectedUnit}
                                    itemToStringValue={(unit) => unit.value}
                                >
                                    <ComboboxInput
                                        id="base_unit_of_measurement_id"
                                        placeholder="Select unit"
                                        aria-invalid={Boolean(
                                            errors.base_unit_of_measurement_id,
                                        )}
                                        className="w-full"
                                    />
                                    <ComboboxContent>
                                        <ComboboxEmpty>
                                            No unit found.
                                        </ComboboxEmpty>
                                        <ComboboxList>
                                            {(unit) => (
                                                <ComboboxItem
                                                    key={unit.value}
                                                    value={unit}
                                                >
                                                    {unit.label}
                                                </ComboboxItem>
                                            )}
                                        </ComboboxList>
                                    </ComboboxContent>
                                </Combobox>
                                <InputError
                                    message={errors.base_unit_of_measurement_id}
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="name"
                                    className="text-sm font-medium"
                                >
                                    Product name{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    id="name"
                                    name="name"
                                    defaultValue={product?.name ?? ''}
                                    aria-invalid={Boolean(errors.name)}
                                    placeholder="Cotton T-Shirt"
                                />
                                <InputError message={errors.name} />
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="brand"
                                    className="text-sm font-medium"
                                >
                                    Brand
                                </label>
                                <Input
                                    id="brand"
                                    name="brand"
                                    defaultValue={product?.brand ?? ''}
                                    aria-invalid={Boolean(errors.brand)}
                                    placeholder="Nike"
                                />
                                <InputError message={errors.brand} />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="sku"
                                    className="text-sm font-medium"
                                >
                                    SKU
                                </label>
                                <Input
                                    id="sku"
                                    name="sku"
                                    defaultValue={product?.sku ?? ''}
                                    aria-invalid={Boolean(errors.sku)}
                                    placeholder="SKU-001"
                                />
                                <InputError message={errors.sku} />
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="gsm"
                                    className="text-sm font-medium"
                                >
                                    GSM
                                </label>
                                <Input
                                    id="gsm"
                                    name="gsm"
                                    type="number"
                                    defaultValue={product?.gsm ?? ''}
                                    aria-invalid={Boolean(errors.gsm)}
                                    placeholder="180"
                                />
                                <InputError message={errors.gsm} />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="size_label"
                                    className="text-sm font-medium"
                                >
                                    Size Label
                                </label>
                                <Input
                                    id="size_label"
                                    name="size_label"
                                    defaultValue={product?.size_label ?? ''}
                                    aria-invalid={Boolean(errors.size_label)}
                                    placeholder="M, L, XL"
                                />
                                <InputError message={errors.size_label} />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="description"
                                className="text-sm font-medium"
                            >
                                Description
                            </label>
                            <Textarea
                                id="description"
                                name="description"
                                defaultValue={product?.description ?? ''}
                                aria-invalid={Boolean(errors.description)}
                                placeholder="Brief description of this product"
                                className="min-h-24 resize-none"
                            />
                            <InputError message={errors.description} />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="status"
                                className="text-sm font-medium"
                            >
                                Status{' '}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="hidden"
                                name="status"
                                value={status}
                                readOnly
                            />
                            <RadioGroup
                                value={status}
                                onValueChange={setStatus}
                                className="flex flex-row gap-6"
                            >
                                {statusOptions.map((option) => (
                                    <div
                                        key={option.value}
                                        className="flex items-center space-x-2"
                                    >
                                        <RadioGroupItem
                                            value={option.value}
                                            id={`status_${option.value}`}
                                            aria-invalid={Boolean(errors.status)}
                                        />
                                        <label
                                            htmlFor={`status_${option.value}`}
                                            className="text-sm font-medium"
                                        >
                                            {option.label}
                                        </label>
                                    </div>
                                ))}
                            </RadioGroup>
                            <InputError message={errors.status} />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3">
                        <Button type="button" variant="outline" asChild>
                            <Link href={cancelHref}>
                                <X />
                                Cancel
                            </Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            <Save />
                            {processing
                                ? 'Saving...'
                                : product
                                  ? 'Update Product'
                                  : 'Create Product'}
                        </Button>
                    </div>
                </div>
            )}
        </Form>
    );
}
