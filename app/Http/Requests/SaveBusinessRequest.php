<?php

namespace App\Http\Requests;

use App\Enums\AreaType;
use App\Enums\BusinessType;
use App\Enums\RecordStatus;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SaveBusinessRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
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
            'status' => ['required', Rule::enum(RecordStatus::class)],
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
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
