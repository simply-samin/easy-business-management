import { Link, useForm } from '@inertiajs/react';
import { Save, X } from 'lucide-react';
import type React from 'react';
import { store, update } from '@/actions/App/Http/Controllers/OutletController';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

type Option = {
    label: string;
    value: string;
};

type BusinessContext = {
    id: number;
    name: string;
};

type OutletRecord = {
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

type OutletFormData = {
    name: string;
    code: string;
    mobile: string;
    email: string;
    outlet_type: string;
    address_line: string;
    district: string;
    area_type: string;
    area_name: string;
    postal_code: string;
    status: string;
};

function getInitialData(outlet?: Partial<OutletRecord>): OutletFormData {
    return {
        name: outlet?.name ?? '',
        code: outlet?.code ?? '',
        mobile: outlet?.mobile ?? '',
        email: outlet?.email ?? '',
        outlet_type: outlet?.outlet_type ?? '',
        address_line: outlet?.address_line ?? '',
        district: outlet?.district ?? '',
        area_type: outlet?.area_type ?? '',
        area_name: outlet?.area_name ?? '',
        postal_code: outlet?.postal_code ?? '',
        status: outlet?.status ?? 'active',
    };
}

export default function OutletForm({
    business,
    outlet,
    outletTypeOptions,
    statusOptions,
    areaTypeOptions,
    cancelHref,
}: {
    business: BusinessContext;
    outlet?: OutletRecord;
    outletTypeOptions: Option[];
    statusOptions: Option[];
    areaTypeOptions: Option[];
    cancelHref: string;
}) {
    const form = useForm<OutletFormData>(getInitialData(outlet));

    function submit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        form.submit(
            outlet ? update({ business, outlet }) : store({ business }),
            {
                preserveScroll: true,
            },
        );
    }

    return (
        <form onSubmit={submit} className="space-y-6">
            <div className="space-y-6">
                <div>
                    <div className="mb-3 text-base font-medium">
                        Outlet details
                    </div>
                    <div className="flex flex-col gap-7">
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="name"
                                className="text-sm font-medium"
                            >
                                Outlet name{' '}
                                <span className="text-red-500">*</span>
                            </label>
                            <Input
                                id="name"
                                value={form.data.name}
                                onChange={(event) =>
                                    form.setData('name', event.target.value)
                                }
                                aria-invalid={Boolean(form.errors.name)}
                                placeholder="Banani Branch"
                            />
                            <InputError message={form.errors.name} />
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="code"
                                    className="text-sm font-medium"
                                >
                                    Outlet code
                                </label>
                                <Input
                                    id="code"
                                    value={form.data.code}
                                    onChange={(event) =>
                                        form.setData('code', event.target.value)
                                    }
                                    aria-invalid={Boolean(form.errors.code)}
                                    placeholder="BAN-01"
                                />
                                <InputError message={form.errors.code} />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="outlet_type"
                                    className="text-sm font-medium"
                                >
                                    Outlet type
                                </label>
                                <Select
                                    value={form.data.outlet_type}
                                    onValueChange={(value) =>
                                        form.setData('outlet_type', value)
                                    }
                                >
                                    <SelectTrigger
                                        id="outlet_type"
                                        className="w-full"
                                        aria-invalid={Boolean(
                                            form.errors.outlet_type,
                                        )}
                                    >
                                        <SelectValue placeholder="Select outlet type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {outletTypeOptions.map((option) => (
                                            <SelectItem
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={form.errors.outlet_type} />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="status"
                                className="text-sm font-medium"
                            >
                                Status <span className="text-red-500">*</span>
                            </label>
                            <RadioGroup
                                value={form.data.status}
                                onValueChange={(value) =>
                                    form.setData('status', value)
                                }
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
                                            aria-invalid={Boolean(
                                                form.errors.status,
                                            )}
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
                            <InputError message={form.errors.status} />
                        </div>
                    </div>
                </div>

                <hr className="my-2 border-t" />

                <div>
                    <div className="mb-3 text-base font-medium">Contact</div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="mobile"
                                className="text-sm font-medium"
                            >
                                Mobile <span className="text-red-500">*</span>
                            </label>
                            <Input
                                id="mobile"
                                value={form.data.mobile}
                                onChange={(event) =>
                                    form.setData('mobile', event.target.value)
                                }
                                aria-invalid={Boolean(form.errors.mobile)}
                                placeholder="01XXXXXXXXX"
                            />
                            <InputError message={form.errors.mobile} />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="email"
                                className="text-sm font-medium"
                            >
                                Email
                            </label>
                            <Input
                                id="email"
                                type="email"
                                value={form.data.email}
                                onChange={(event) =>
                                    form.setData('email', event.target.value)
                                }
                                aria-invalid={Boolean(form.errors.email)}
                                placeholder="branch@example.com"
                            />
                            <InputError message={form.errors.email} />
                        </div>
                    </div>
                </div>

                <hr className="my-2 border-t" />

                <div>
                    <div className="mb-3 text-base font-medium">Address</div>

                    <div className="flex flex-col gap-7">
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="address_line"
                                className="text-sm font-medium"
                            >
                                Address line
                            </label>
                            <Textarea
                                id="address_line"
                                value={form.data.address_line}
                                onChange={(event) =>
                                    form.setData(
                                        'address_line',
                                        event.target.value,
                                    )
                                }
                                aria-invalid={Boolean(form.errors.address_line)}
                                placeholder="House, road, market or landmark"
                                className="min-h-28 resize-none"
                            />
                            <InputError message={form.errors.address_line} />
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="district"
                                    className="text-sm font-medium"
                                >
                                    District
                                </label>
                                <Input
                                    id="district"
                                    value={form.data.district}
                                    onChange={(event) =>
                                        form.setData(
                                            'district',
                                            event.target.value,
                                        )
                                    }
                                    aria-invalid={Boolean(form.errors.district)}
                                    placeholder="Dhaka"
                                />
                                <InputError message={form.errors.district} />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="postal_code"
                                    className="text-sm font-medium"
                                >
                                    Postal code
                                </label>
                                <Input
                                    id="postal_code"
                                    value={form.data.postal_code}
                                    onChange={(event) =>
                                        form.setData(
                                            'postal_code',
                                            event.target.value,
                                        )
                                    }
                                    aria-invalid={Boolean(
                                        form.errors.postal_code,
                                    )}
                                    placeholder="1213"
                                />
                                <InputError message={form.errors.postal_code} />
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="flex flex-col gap-2">
                                <div className="relative flex items-center">
                                    <label
                                        htmlFor="area_type"
                                        className="text-sm font-medium"
                                    >
                                        Area type
                                    </label>
                                    {form.data.area_type && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() =>
                                                form.setData('area_type', '')
                                            }
                                            className="absolute right-0 h-auto px-2 py-1 text-xs"
                                        >
                                            Clear
                                        </Button>
                                    )}
                                </div>
                                <RadioGroup
                                    value={form.data.area_type}
                                    onValueChange={(value) =>
                                        form.setData('area_type', value)
                                    }
                                    className="flex flex-row gap-6"
                                >
                                    {areaTypeOptions.map((option) => (
                                        <div
                                            key={option.value}
                                            className="flex items-center space-x-2"
                                        >
                                            <RadioGroupItem
                                                value={option.value}
                                                id={`area_type_${option.value}`}
                                                aria-invalid={Boolean(
                                                    form.errors.area_type,
                                                )}
                                            />
                                            <label
                                                htmlFor={`area_type_${option.value}`}
                                                className="text-sm font-medium"
                                            >
                                                {option.label}
                                            </label>
                                        </div>
                                    ))}
                                </RadioGroup>
                                <InputError message={form.errors.area_type} />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="area_name"
                                    className="text-sm font-medium"
                                >
                                    Area name
                                    {form.data.area_type && (
                                        <span className="text-red-500"> *</span>
                                    )}
                                </label>
                                <Input
                                    id="area_name"
                                    value={form.data.area_name}
                                    onChange={(event) =>
                                        form.setData(
                                            'area_name',
                                            event.target.value,
                                        )
                                    }
                                    aria-invalid={Boolean(
                                        form.errors.area_name,
                                    )}
                                    placeholder={
                                        form.data.area_type === 'thana'
                                            ? 'Gulshan'
                                            : 'Keraniganj'
                                    }
                                />
                                <InputError message={form.errors.area_name} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-3">
                    <Button type="button" variant="outline" asChild>
                        <Link href={cancelHref}>
                            <X />
                            Cancel
                        </Link>
                    </Button>
                    <Button type="submit" disabled={form.processing}>
                        <Save />
                        {form.processing
                            ? 'Saving...'
                            : outlet
                              ? 'Update Outlet'
                              : 'Create Outlet'}
                    </Button>
                </div>
            </div>
        </form>
    );
}
