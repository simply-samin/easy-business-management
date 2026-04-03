<?php

namespace App\Concerns;

use App\Enums\AreaType;
use App\Enums\OutletStatus;
use App\Enums\OutletType;
use App\Models\Outlet;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Validation\Rule;

trait OutletValidationRules
{
    /**
     * Get the validation rules used to validate outlets.
     *
     * @return array<string, array<int, ValidationRule|array<mixed>|string>>
     */
    protected function outletRules(int $businessId, ?int $outletId = null): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'code' => [
                'nullable',
                'string',
                'max:50',
                Rule::unique(Outlet::class, 'code')
                    ->where(fn ($query) => $query->where('business_id', $businessId))
                    ->ignore($outletId),
            ],
            'mobile' => ['required', 'string', 'max:20'],
            'email' => ['nullable', 'email', 'max:255'],
            'outlet_type' => ['nullable', Rule::enum(OutletType::class)],
            'address_line' => ['nullable', 'string', 'max:1000'],
            'district' => ['nullable', 'string', 'max:255'],
            'area_type' => ['nullable', Rule::enum(AreaType::class), 'required_with:area_name'],
            'area_name' => ['nullable', 'string', 'max:255', 'required_with:area_type'],
            'postal_code' => ['nullable', 'string', 'max:20'],
            'status' => ['required', Rule::enum(OutletStatus::class)],
        ];
    }

    /**
     * Get the validation messages used to validate outlets.
     *
     * @return array<string, string>
     */
    protected function outletMessages(): array
    {
        return [
            'name.required' => 'Enter an outlet name.',
            'mobile.required' => 'Enter an outlet mobile number.',
            'status.required' => 'Choose an outlet status.',
            'code.unique' => 'This outlet code is already in use for the selected business.',
            'area_type.required_with' => 'Choose whether the area is an upazila or thana.',
            'area_name.required_with' => 'Enter the selected area name.',
        ];
    }
}
