import { router } from '@inertiajs/react';
import { Check, Pencil, Plus, Trash2, X } from 'lucide-react';
import { useState, type Dispatch, type SetStateAction } from 'react';
import ProductUnitConversionController from '@/actions/App/Http/Controllers/ProductUnitConversionController';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from '@/components/ui/combobox';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import type { Option } from '@/types';
import type {
    Product,
    ProductUnitConversion,
    ProductUnitConversionFormData,
    UnitOfMeasurement,
} from './types';

type FormMode =
    | { mode: 'create' }
    | { mode: 'edit'; conversionId: number }
    | null;

function createProductUnitConversionFormData(
    productUnitConversion?: ProductUnitConversion,
): ProductUnitConversionFormData {
    if (!productUnitConversion) {
        return {
            unit_of_measurement_id: '',
            conversion_factor_to_base: '',
            is_default_purchase_unit: false,
            is_default_sale_unit: false,
            status: 'active',
        };
    }

    return {
        unit_of_measurement_id:
            productUnitConversion.unit_of_measurement_id.toString(),
        conversion_factor_to_base: formatFactorValue(
            productUnitConversion.conversion_factor_to_base,
        ),
        is_default_purchase_unit:
            productUnitConversion.is_default_purchase_unit,
        is_default_sale_unit: productUnitConversion.is_default_sale_unit,
        status: productUnitConversion.status,
    };
}

function formatFactorValue(value: string): string {
    if (value === '') {
        return value;
    }

    const parsedValue = Number(value);

    if (Number.isNaN(parsedValue)) {
        return value;
    }

    return parsedValue.toFixed(2);
}

function formatFactorLabel(
    unitName: string,
    factor: string,
    baseUnitName: string,
): string {
    if (unitName === baseUnitName && Number(factor) === 1) {
        return `1 ${unitName} = 1 ${baseUnitName}`;
    }

    return `1 ${unitName} = ${formatFactorValue(factor)} ${baseUnitName}`;
}

export default function UnitConversionsTable({
    product,
    unitOfMeasurements,
    statusOptions,
}: {
    product: Product;
    unitOfMeasurements: UnitOfMeasurement[];
    statusOptions: Option[];
}) {
    const [formMode, setFormMode] = useState<FormMode>(null);
    const [conversionFormData, setConversionFormData] =
        useState<ProductUnitConversionFormData>(
            createProductUnitConversionFormData(),
        );
    const [errors, setErrors] = useState<Record<string, string>>({});

    const unitConversions = product.unit_conversions ?? [];

    const baseUnitName = product.base_unit_of_measurement?.name ?? 'Base Unit';

    const baseUnitConversion =
        unitConversions.find((unitConversion) => unitConversion.is_base_unit) ??
        null;
    const hasAlternateUnitConversions = unitConversions.some(
        (unitConversion) => !unitConversion.is_base_unit,
    );

    const getAvailableUnitOptions = (
        currentUnitOfMeasurementId?: number,
    ): Option[] =>
        unitOfMeasurements
            .filter((unitOfMeasurement) => {
                if (currentUnitOfMeasurementId === unitOfMeasurement.id) {
                    return true;
                }

                return !unitConversions
                    .map(
                        (unitConversion) =>
                            unitConversion.unit_of_measurement_id,
                    )
                    .includes(unitOfMeasurement.id);
            })
            .map((unitOfMeasurement) => ({
                label: unitOfMeasurement.name,
                value: unitOfMeasurement.id.toString(),
            }));

    const handleCreateConversion = () => {
        setFormMode({ mode: 'create' });
        setConversionFormData(createProductUnitConversionFormData());
        setErrors({});
    };

    const handleEditConversion = (
        productUnitConversion: ProductUnitConversion,
    ) => {
        setFormMode({
            mode: 'edit',
            conversionId: productUnitConversion.id,
        });
        setConversionFormData(
            createProductUnitConversionFormData(productUnitConversion),
        );
        setErrors({});
    };

    const resetConversionFormState = () => {
        setFormMode(null);
        setErrors({});
    };

    const handleCancelConversion = () => {
        resetConversionFormState();
    };

    const handleSaveConversion = () => {
        if (formMode === null) {
            return;
        }

        const visitOptions = {
            preserveScroll: true,
            errorBag: 'productUnitConversion',
            onSuccess: () => {
                resetConversionFormState();
            },
            onError: (pageErrors: Record<string, string>) => {
                setErrors(pageErrors);
            },
        };

        if (formMode.mode === 'create') {
            router.post(
                ProductUnitConversionController.store({ product }),
                conversionFormData,
                visitOptions,
            );

            return;
        }

        router.patch(
            ProductUnitConversionController.update({
                product,
                product_unit_conversion: formMode.conversionId,
            }),
            conversionFormData,
            visitOptions,
        );
    };

    const handleDeleteConversion = (productUnitConversionId: number) => {
        if (
            !window.confirm(
                'Are you sure you want to delete this unit conversion?',
            )
        ) {
            return;
        }

        router.delete(
            ProductUnitConversionController.destroy({
                product,
                product_unit_conversion: productUnitConversionId,
            }),
            {
                preserveScroll: true,
                errorBag: 'productUnitConversion',
                onSuccess: () => {
                    setErrors({});
                },
                onError: (pageErrors: Record<string, string>) => {
                    setErrors(pageErrors);
                },
            },
        );
    };

    return (
        <div className="space-y-4">
            <div className="text-base font-medium">Unit Conversions</div>

            {errors.product_unit_conversion && (
                <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                    {errors.product_unit_conversion}
                </div>
            )}

            <div className="overflow-x-auto rounded-md border">
                <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                        <tr className="border-b">
                            <th className="h-10 px-3 text-left align-middle font-medium">
                                Unit
                            </th>
                            <th className="h-10 w-48 px-3 text-left align-middle font-medium">
                                Factor
                            </th>
                            <th className="h-10 w-16 px-3 text-center align-middle font-medium">
                                Base
                            </th>
                            <th className="h-10 w-24 px-3 text-center align-middle font-medium">
                                D.Pur
                            </th>
                            <th className="h-10 w-24 px-3 text-center align-middle font-medium">
                                D.Sal
                            </th>
                            <th className="h-10 w-28 px-3 text-left align-middle font-medium">
                                Status
                            </th>
                            <th className="h-10 w-24 px-3 text-right align-middle font-medium">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                        {unitConversions.map((productUnitConversion) => {
                            const isBaseConversion =
                                baseUnitConversion?.id ===
                                productUnitConversion.id;

                            return formMode?.mode === 'edit' &&
                                formMode.conversionId ===
                                    productUnitConversion.id ? (
                                <ProductUnitConversionForm
                                    key={productUnitConversion.id}
                                    productUnitConversion={productUnitConversion}
                                    baseUnitName={baseUnitName}
                                    availableUnitOptions={getAvailableUnitOptions(
                                        productUnitConversion.unit_of_measurement_id,
                                    )}
                                    statusOptions={statusOptions}
                                    conversionFormData={conversionFormData}
                                    setConversionFormData={
                                        setConversionFormData
                                    }
                                    errors={errors}
                                    isBaseConversion={isBaseConversion}
                                    isEditMode
                                    onCancel={handleCancelConversion}
                                    onSave={handleSaveConversion}
                                />
                            ) : (
                                <ProductUnitConversionRow
                                    key={productUnitConversion.id}
                                    productUnitConversion={productUnitConversion}
                                    baseUnitName={baseUnitName}
                                    statusOptions={statusOptions}
                                    isBaseConversion={isBaseConversion}
                                    onEdit={() =>
                                        handleEditConversion(
                                            productUnitConversion,
                                        )
                                    }
                                    onDelete={() =>
                                        handleDeleteConversion(
                                            productUnitConversion.id,
                                        )
                                    }
                                />
                            );
                        })}

                        {formMode?.mode === 'create' && (
                            <ProductUnitConversionForm
                                baseUnitName={baseUnitName}
                                availableUnitOptions={getAvailableUnitOptions()}
                                statusOptions={statusOptions}
                                conversionFormData={conversionFormData}
                                setConversionFormData={setConversionFormData}
                                errors={errors}
                                isBaseConversion={false}
                                isEditMode={false}
                                onCancel={handleCancelConversion}
                                onSave={handleSaveConversion}
                            />
                        )}
                    </tbody>
                </table>
            </div>

            {!hasAlternateUnitConversions && formMode?.mode !== 'create' && (
                <div className="text-sm text-muted-foreground">
                    No alternate units defined. Add one to use this product in
                    other quantities.
                </div>
            )}

            <div className="flex justify-center">
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleCreateConversion}
                    disabled={formMode !== null}
                >
                    <Plus className="size-4" />
                    Add Unit Conversion
                </Button>
            </div>
        </div>
    );
}

function ProductUnitConversionRow({
    productUnitConversion,
    baseUnitName,
    statusOptions,
    isBaseConversion,
    onEdit,
    onDelete,
}: {
    productUnitConversion: ProductUnitConversion;
    baseUnitName: string;
    statusOptions: Option[];
    isBaseConversion: boolean;
    onEdit?: () => void;
    onDelete?: () => void;
}) {
    const statusLabel =
        statusOptions.find(
            (statusOption) =>
                statusOption.value === productUnitConversion.status,
        )?.label ?? productUnitConversion.status;

    return (
        <tr
            className={
                isBaseConversion
                    ? 'border-b bg-muted/30 font-semibold'
                    : 'border-b transition-colors hover:bg-muted/50'
            }
        >
            <td className="px-3 py-3 align-top">
                <div>
                    {productUnitConversion.unit_of_measurement.name}
                </div>
            </td>
            <td className="px-3 py-3 align-top">
                {formatFactorLabel(
                    productUnitConversion.unit_of_measurement.name,
                    productUnitConversion.conversion_factor_to_base,
                    baseUnitName,
                )}
            </td>
            <td className="px-3 py-3 text-center align-top">
                {isBaseConversion ? 'Yes' : '-'}
            </td>
            <td className="px-3 py-3 text-center align-top">
                {productUnitConversion.is_default_purchase_unit ? 'Yes' : '-'}
            </td>
            <td className="px-3 py-3 text-center align-top">
                {productUnitConversion.is_default_sale_unit ? 'Yes' : '-'}
            </td>
            <td className="px-3 py-3 align-top">
                <Badge
                    variant="outline"
                    className={
                        productUnitConversion.status === 'active'
                            ? 'border-transparent bg-blue-100 text-blue-800 hover:bg-blue-100'
                            : 'border-transparent bg-gray-300 text-gray-800 hover:bg-gray-300'
                    }
                >
                    {statusLabel}
                </Badge>
            </td>
            <td className="px-3 py-3 text-right align-top">
                <div className="flex justify-end gap-1">
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        onClick={onEdit}
                    >
                        <Pencil className="size-4" />
                        <span className="sr-only">Edit conversion</span>
                    </Button>
                    {!isBaseConversion && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon-sm"
                            onClick={onDelete}
                        >
                            <Trash2 className="size-4" />
                            <span className="sr-only">
                                Delete conversion
                            </span>
                        </Button>
                    )}
                </div>
            </td>
        </tr>
    );
}

function ProductUnitConversionForm({
    productUnitConversion,
    baseUnitName,
    availableUnitOptions,
    statusOptions,
    conversionFormData,
    setConversionFormData,
    errors,
    isBaseConversion,
    isEditMode,
    onCancel,
    onSave,
}: {
    productUnitConversion?: ProductUnitConversion;
    baseUnitName: string;
    availableUnitOptions: Option[];
    statusOptions: Option[];
    conversionFormData: ProductUnitConversionFormData;
    setConversionFormData: Dispatch<
        SetStateAction<ProductUnitConversionFormData>
    >;
    errors: Record<string, string>;
    isBaseConversion: boolean;
    isEditMode: boolean;
    onCancel?: () => void;
    onSave?: () => void;
}) {
    const selectedUnitOption = availableUnitOptions.find(
        (unitOption) =>
            unitOption.value === conversionFormData.unit_of_measurement_id,
    );
    const selectedUnitName = selectedUnitOption?.label ?? 'Selected Unit';
    const statusLabel =
        statusOptions.find(
            (statusOption) => statusOption.value === conversionFormData.status,
        )?.label ?? conversionFormData.status;

    return (
        <tr className="border-b transition-colors hover:bg-muted/50">
            <td className="px-3 py-3 align-top">
                {isBaseConversion ? (
                    <>
                        <div>
                            {productUnitConversion?.unit_of_measurement?.name ??
                                baseUnitName}
                        </div>
                    </>
                ) : (
                    <>
                        <Combobox
                            items={availableUnitOptions}
                            value={selectedUnitOption}
                            onValueChange={(unitOption) =>
                                setConversionFormData((currentFormData) => ({
                                    ...currentFormData,
                                    unit_of_measurement_id:
                                        unitOption?.value ?? '',
                                }))
                            }
                            itemToStringValue={(unitOption) => unitOption.value}
                            disabled={isEditMode}
                        >
                            <ComboboxInput
                                placeholder="Select unit"
                                className="w-full"
                                disabled={isEditMode}
                                aria-invalid={Boolean(
                                    errors.unit_of_measurement_id,
                                )}
                            />
                            <ComboboxContent>
                                <ComboboxEmpty>No unit found.</ComboboxEmpty>
                                <ComboboxList>
                                    {(unitOption) => (
                                        <ComboboxItem
                                            key={unitOption.value}
                                            value={unitOption}
                                        >
                                            {unitOption.label}
                                        </ComboboxItem>
                                    )}
                                </ComboboxList>
                            </ComboboxContent>
                        </Combobox>
                        {/* <InputError message={errors.unit_of_measurement_id} /> */}
                    </>
                )}
            </td>
            <td className="px-3 py-3 align-top">
                {isBaseConversion ? (
                    <div className="mt-2 text-sm">
                        {formatFactorLabel(
                            productUnitConversion?.unit_of_measurement?.name ??
                                baseUnitName,
                            conversionFormData.conversion_factor_to_base || '1',
                            baseUnitName,
                        )}
                    </div>
                ) : (
                    <Input
                        type="number"
                        step="0.01"
                        min="0.01"
                        value={conversionFormData.conversion_factor_to_base}
                        onChange={(event) =>
                            setConversionFormData((currentFormData) => ({
                                ...currentFormData,
                                conversion_factor_to_base: event.target.value,
                            }))
                        }
                        aria-invalid={Boolean(errors.conversion_factor_to_base)}
                        className="no-number-spinner text-right"
                    />
                )}
                {!isBaseConversion && (
                    <div className="mt-1 text-xs text-muted-foreground">
                        {formatFactorLabel(
                            selectedUnitName,
                            conversionFormData.conversion_factor_to_base || '0',
                            baseUnitName,
                        )}
                    </div>
                )}
                {/* {!isBaseConversion && (
                    <InputError message={errors.conversion_factor_to_base} />
                )} */}
            </td>
            <td className="px-3 py-3 text-center align-top">
                {isBaseConversion ? 'Yes' : '-'}
            </td>
            <td className="px-3 py-3 text-center align-top">
                <div className="flex flex-col items-center gap-2">
                    <Checkbox
                        checked={conversionFormData.is_default_purchase_unit}
                        onCheckedChange={(checked) =>
                            setConversionFormData((currentFormData) => ({
                                ...currentFormData,
                                is_default_purchase_unit: checked === true,
                            }))
                        }
                    />
                    <InputError message={errors.is_default_purchase_unit} />
                </div>
            </td>
            <td className="px-3 py-3 text-center align-top">
                <div className="flex flex-col items-center gap-2">
                    <Checkbox
                        checked={conversionFormData.is_default_sale_unit}
                        onCheckedChange={(checked) =>
                            setConversionFormData((currentFormData) => ({
                                ...currentFormData,
                                is_default_sale_unit: checked === true,
                            }))
                        }
                    />
                    <InputError message={errors.is_default_sale_unit} />
                </div>
            </td>
            <td className="px-3 py-3 align-top">
                {isBaseConversion ? (
                    <Badge
                        variant="outline"
                        className={
                            conversionFormData.status === 'active'
                                ? 'border-transparent bg-blue-100 text-blue-800 hover:bg-blue-100'
                                : 'border-transparent bg-gray-300 text-gray-800 hover:bg-gray-300'
                        }
                    >
                        {statusLabel}
                    </Badge>
                ) : (
                    <>
                        <Select
                            value={conversionFormData.status}
                            onValueChange={(value) =>
                                setConversionFormData((currentFormData) => ({
                                    ...currentFormData,
                                    status: value,
                                }))
                            }
                        >
                            <SelectTrigger
                                className="w-full"
                                aria-invalid={Boolean(errors.status)}
                            >
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                {statusOptions.map((statusOption) => (
                                    <SelectItem
                                        key={statusOption.value}
                                        value={statusOption.value}
                                    >
                                        {statusOption.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.status} />
                    </>
                )}
            </td>
            <td className="px-3 py-3 text-right align-top">
                <div className="flex justify-end gap-1">
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        onClick={onSave}
                    >
                        <Check className="size-4" />
                        <span className="sr-only">Save conversion</span>
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        onClick={onCancel}
                    >
                        <X className="size-4" />
                        <span className="sr-only">Cancel conversion</span>
                    </Button>
                </div>
            </td>
        </tr>
    );
}
