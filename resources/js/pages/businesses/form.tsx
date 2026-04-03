import { Link, useForm } from '@inertiajs/react';
import { Save, X } from 'lucide-react';
import type React from 'react';
import {
    store,
    update,
} from '../../actions/App/Http/Controllers/BusinessController';
import InputError from '../../components/input-error';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../../components/ui/select';
import { Textarea } from '../../components/ui/textarea';
import type { Business, BusinessFormData, Option } from './types';

function getInitialData(business?: Partial<Business>): BusinessFormData {
    return {
        name: business?.name ?? '',
        trade_name: business?.trade_name ?? '',
        business_type: business?.business_type ?? '',
        mobile: business?.mobile ?? '',
        email: business?.email ?? '',
        trade_license_no: business?.trade_license_no ?? '',
        tin_no: business?.tin_no ?? '',
        bin_no: business?.bin_no ?? '',
        address_line: business?.address_line ?? '',
        district: business?.district ?? '',
        area_type: business?.area_type ?? '',
        area_name: business?.area_name ?? '',
        postal_code: business?.postal_code ?? '',
        status: business?.status ?? 'active',
    };
}

export default function BusinessForm({
    business,
    businessTypeOptions,
    statusOptions,
    areaTypeOptions,
    cancelHref,
}: {
    business?: Business;
    businessTypeOptions: Option[];
    statusOptions: Option[];
    areaTypeOptions: Option[];
    cancelHref: string;
}) {
    const form = useForm<BusinessFormData>(getInitialData(business));

    function submit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        form.submit(business ? update(business) : store(), {
            preserveScroll: true,
        });
    }

    return (
        <form onSubmit={submit} className="space-y-6">
            <div className="space-y-6">
                <div>
                    <div className="mb-3 text-base font-medium">
                        Business details
                    </div>
                    <div className="flex flex-col gap-7">
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="name"
                                className="text-sm font-medium"
                            >
                                Business name{' '}
                                <span className="text-red-500">*</span>
                            </label>
                            <Input
                                id="name"
                                value={form.data.name}
                                onChange={(event) =>
                                    form.setData('name', event.target.value)
                                }
                                aria-invalid={Boolean(form.errors.name)}
                                placeholder="Rahman Trading Co."
                            />
                            <InputError message={form.errors.name} />
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="trade_name"
                                    className="text-sm font-medium"
                                >
                                    Trade name
                                </label>
                                <Input
                                    id="trade_name"
                                    value={form.data.trade_name}
                                    onChange={(event) =>
                                        form.setData(
                                            'trade_name',
                                            event.target.value,
                                        )
                                    }
                                    aria-invalid={Boolean(
                                        form.errors.trade_name,
                                    )}
                                    placeholder="Rahman Mart"
                                />
                                <InputError message={form.errors.trade_name} />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="business_type"
                                    className="text-sm font-medium"
                                >
                                    Business type{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <Select
                                    value={form.data.business_type}
                                    onValueChange={(value) =>
                                        form.setData('business_type', value)
                                    }
                                >
                                    <SelectTrigger
                                        id="business_type"
                                        className="w-full"
                                        aria-invalid={Boolean(
                                            form.errors.business_type,
                                        )}
                                    >
                                        <SelectValue placeholder="Select business type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {businessTypeOptions.map((option) => (
                                            <SelectItem
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError
                                    message={form.errors.business_type}
                                />
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
                                placeholder="hello@business.com"
                            />
                            <InputError message={form.errors.email} />
                        </div>
                    </div>
                </div>

                <hr className="my-2 border-t" />

                <div>
                    <div className="mb-3 text-base font-medium">
                        Registration
                    </div>

                    <div className="flex flex-col gap-7">
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="trade_license_no"
                                className="text-sm font-medium"
                            >
                                Trade license no.
                            </label>
                            <Input
                                id="trade_license_no"
                                value={form.data.trade_license_no}
                                onChange={(event) =>
                                    form.setData(
                                        'trade_license_no',
                                        event.target.value,
                                    )
                                }
                                aria-invalid={Boolean(
                                    form.errors.trade_license_no,
                                )}
                            />
                            <InputError
                                message={form.errors.trade_license_no}
                            />
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="tin_no"
                                    className="text-sm font-medium"
                                >
                                    TIN no.
                                </label>
                                <Input
                                    id="tin_no"
                                    value={form.data.tin_no}
                                    onChange={(event) =>
                                        form.setData(
                                            'tin_no',
                                            event.target.value,
                                        )
                                    }
                                    aria-invalid={Boolean(form.errors.tin_no)}
                                />
                                <InputError message={form.errors.tin_no} />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="bin_no"
                                    className="text-sm font-medium"
                                >
                                    BIN no.
                                </label>
                                <Input
                                    id="bin_no"
                                    value={form.data.bin_no}
                                    onChange={(event) =>
                                        form.setData(
                                            'bin_no',
                                            event.target.value,
                                        )
                                    }
                                    aria-invalid={Boolean(form.errors.bin_no)}
                                />
                                <InputError message={form.errors.bin_no} />
                            </div>
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
                                placeholder="House, road, market, village or landmark"
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
                                    placeholder="1212"
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
                                            ? 'Motijheel'
                                            : 'Savar'
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
                            : business
                              ? 'Update Business'
                              : 'Create Business'}
                    </Button>
                </div>
            </div>
        </form>
    );
}
