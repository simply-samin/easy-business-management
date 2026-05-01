<?php

namespace App\Http\Requests;

use App\Enums\RecordStatus;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SaveProductRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'business_id' => ['required', 'exists:businesses,id'],
            'product_category_id' => ['required', 'exists:product_categories,id'],
            'name' => ['required', 'string', 'max:255'],
            'brand' => ['nullable', 'string', 'max:255'],
            'gsm' => ['nullable', 'integer'],
            'size_label' => ['nullable', 'string', 'max:255'],
            'base_unit_of_measurement_id' => ['required', 'exists:unit_of_measurements,id'],
            'sku' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:1000'],
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
            'business_id.required' => 'Select a business.',
            'product_category_id.required' => 'Select a product category.',
            'base_unit_of_measurement_id.required' => 'Select a base unit of measurement.',
            'name.required' => 'Enter a product name.',
            'status.required' => 'Choose a status.',
        ];
    }
}
