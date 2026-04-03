<?php

namespace App\Concerns;

use App\Enums\AreaType;
use App\Enums\BusinessStatus;
use App\Enums\BusinessType;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Validation\Rule;

trait BusinessValidationRules
{
    /**
     * Get the validation rules used to validate businesses.
     *
     * @return array<string, array<int, ValidationRule|array<mixed>|string>>
     */
    protected function businessRules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'trade_name' => ['nullable', 'string', 'max:255'],
            'business_type' => ['required', Rule::enum(BusinessType::class)],
            'mobile' => ['required', 'string', 'max:20'],
            'email' => ['nullable', 'email', 'max:255'],
            'trade_license_no' => ['nullable', 'string', 'max:255'],
            'tin_no' => ['nullable', 'string', 'max:255'],
            'bin_no' => ['nullable', 'string', 'max:255'],
            'address_line' => ['nullable', 'string', 'max:1000'],
            'district' => ['nullable', 'string', 'max:255'],
            'area_type' => ['nullable', Rule::enum(AreaType::class), 'required_with:area_name'],
            'area_name' => ['nullable', 'string', 'max:255', 'required_with:area_type'],
            'postal_code' => ['nullable', 'string', 'max:20'],
            'status' => ['required', Rule::enum(BusinessStatus::class)],
        ];
    }

    /**
     * Get the validation messages used to validate businesses.
     *
     * @return array<string, string>
     */
    protected function businessMessages(): array
    {
        return [
            'name.required' => 'Enter a business name.',
            'business_type.required' => 'Choose a business type.',
            'mobile.required' => 'Enter a business mobile number.',
            'status.required' => 'Choose a business status.',
            'area_type.required_with' => 'Choose whether the area is an upazila or thana.',
            'area_name.required_with' => 'Enter the selected area name.',
        ];
    }
}
