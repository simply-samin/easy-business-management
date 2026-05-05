<?php

namespace App\Http\Requests;

use App\Enums\RecordStatus;
use App\Models\Product;
use App\Models\ProductUnitConversion;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SaveProductUnitConversionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        /** @var Product $product */
        $product = $this->route('product');
        /** @var ProductUnitConversion|null $productUnitConversion */
        $productUnitConversion = $this->route('product_unit_conversion');

        return [
            'unit_of_measurement_id' => [
                'required',
                'exists:unit_of_measurements,id',
                Rule::unique('product_unit_conversions', 'unit_of_measurement_id')
                    ->where('product_id', $product->id)
                    ->ignore($productUnitConversion?->id),
            ],
            'conversion_factor_to_base' => ['required', 'numeric', 'gt:0'],
            'is_default_purchase_unit' => ['boolean'],
            'is_default_sale_unit' => ['boolean'],
            'status' => ['required', Rule::enum(RecordStatus::class)],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'unit_of_measurement_id.required' => 'Select a unit of measurement.',
            'unit_of_measurement_id.unique' => 'This unit is already defined for the product.',
            'conversion_factor_to_base.required' => 'Enter the conversion factor.',
            'conversion_factor_to_base.gt' => 'Conversion factor must be greater than zero.',
            'status.required' => 'Choose a status.',
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'is_default_purchase_unit' => $this->boolean('is_default_purchase_unit'),
            'is_default_sale_unit' => $this->boolean('is_default_sale_unit'),
        ]);
    }
}
