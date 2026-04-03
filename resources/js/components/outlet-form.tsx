import { Link, useForm } from '@inertiajs/react';
import { Save, X } from 'lucide-react';
import type React from 'react';
import { store, update } from '@/actions/App/Http/Controllers/OutletController';
import AlertError from '@/components/alert-error';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

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

function textareaClassName(hasError: boolean): string {
    return cn(
        'flex min-h-28 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
        hasError && 'border-destructive',
    );
}

function outletFormDefaults(outlet?: Partial<OutletRecord>): OutletFormData {
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
        status: outlet?.status ?? '',
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
    const form = useForm<OutletFormData>(outletFormDefaults(outlet));

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
            {Object.keys(form.errors).length > 0 && (
                <AlertError errors={Object.values(form.errors)} />
            )}

            <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
                <section className="space-y-6 rounded-2xl border bg-card p-6 shadow-sm">
                    <div className="space-y-1">
                        <h2 className="text-lg font-semibold">
                            Outlet details
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            This outlet belongs to {business.name}. Keep branch
                            operations distinct from the parent business record.
                        </p>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        <div className="grid gap-2 md:col-span-2">
                            <Label htmlFor="name">Outlet name</Label>
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

                        <div className="grid gap-2">
                            <Label htmlFor="code">Outlet code</Label>
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

                        <div className="grid gap-2">
                            <Label htmlFor="outlet_type">Outlet type</Label>
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

                        <div className="grid gap-2">
                            <Label htmlFor="mobile">Mobile</Label>
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

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
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

                        <div className="grid gap-2">
                            <Label htmlFor="status">Status</Label>
                            <Select
                                value={form.data.status}
                                onValueChange={(value) =>
                                    form.setData('status', value)
                                }
                            >
                                <SelectTrigger
                                    id="status"
                                    className="w-full"
                                    aria-invalid={Boolean(form.errors.status)}
                                >
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    {statusOptions.map((option) => (
                                        <SelectItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={form.errors.status} />
                        </div>
                    </div>
                </section>

                <section className="space-y-6 rounded-2xl border bg-card p-6 shadow-sm">
                    <div className="space-y-1">
                        <h2 className="text-lg font-semibold">
                            Branch address
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Keep branch contact and address details local to the
                            outlet.
                        </p>
                    </div>

                    <div className="grid gap-5">
                        <div className="grid gap-2">
                            <Label htmlFor="district">District</Label>
                            <Input
                                id="district"
                                value={form.data.district}
                                onChange={(event) =>
                                    form.setData('district', event.target.value)
                                }
                                aria-invalid={Boolean(form.errors.district)}
                                placeholder="Dhaka"
                            />
                            <InputError message={form.errors.district} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="postal_code">Postal code</Label>
                            <Input
                                id="postal_code"
                                value={form.data.postal_code}
                                onChange={(event) =>
                                    form.setData(
                                        'postal_code',
                                        event.target.value,
                                    )
                                }
                                aria-invalid={Boolean(form.errors.postal_code)}
                                placeholder="1213"
                            />
                            <InputError message={form.errors.postal_code} />
                        </div>
                    </div>
                </section>
            </div>

            <section className="space-y-6 rounded-2xl border bg-card p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                        <h2 className="text-lg font-semibold">
                            Area and address line
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Choose whether the outlet location uses an upazila
                            or thana reference.
                        </p>
                    </div>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                            form.setData('area_type', '');
                            form.setData('area_name', '');
                        }}
                    >
                        Clear area
                    </Button>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                    <div className="grid gap-2 md:col-span-2">
                        <Label htmlFor="address_line">Address line</Label>
                        <textarea
                            id="address_line"
                            value={form.data.address_line}
                            onChange={(event) =>
                                form.setData('address_line', event.target.value)
                            }
                            aria-invalid={Boolean(form.errors.address_line)}
                            className={textareaClassName(
                                Boolean(form.errors.address_line),
                            )}
                            placeholder="House, road, market or landmark"
                        />
                        <InputError message={form.errors.address_line} />
                    </div>

                    <div className="grid gap-3 md:col-span-2">
                        <Label>Area type</Label>
                        <div className="grid gap-3 md:grid-cols-2">
                            {areaTypeOptions.map((option) => {
                                const isSelected =
                                    form.data.area_type === option.value;

                                return (
                                    <label
                                        key={option.value}
                                        className={cn(
                                            'flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-colors',
                                            isSelected
                                                ? 'border-primary bg-primary/5'
                                                : 'border-border hover:border-primary/40',
                                        )}
                                    >
                                        <input
                                            type="radio"
                                            name="area_type"
                                            value={option.value}
                                            checked={isSelected}
                                            onChange={(event) =>
                                                form.setData(
                                                    'area_type',
                                                    event.target.value,
                                                )
                                            }
                                            className="size-4"
                                        />
                                        <span>{option.label}</span>
                                    </label>
                                );
                            })}
                        </div>
                        <InputError message={form.errors.area_type} />
                    </div>

                    <div className="grid gap-2 md:col-span-2">
                        <Label htmlFor="area_name">Area name</Label>
                        <Input
                            id="area_name"
                            value={form.data.area_name}
                            onChange={(event) =>
                                form.setData('area_name', event.target.value)
                            }
                            aria-invalid={Boolean(form.errors.area_name)}
                            placeholder={
                                form.data.area_type === 'thana'
                                    ? 'Gulshan'
                                    : 'Keraniganj'
                            }
                        />
                        <InputError message={form.errors.area_name} />
                    </div>
                </div>
            </section>

            <div className="flex flex-wrap items-center justify-end gap-3">
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
        </form>
    );
}
