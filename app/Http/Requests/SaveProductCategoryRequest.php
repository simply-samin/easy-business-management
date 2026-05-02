<?php

namespace App\Http\Requests;

use App\Enums\RecordStatus;
use App\Models\Business;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SaveProductCategoryRequest extends FormRequest
{
    protected function prepareForValidation(): void
    {
        $this->merge([
            'business_id' => Business::current()->id,
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'business_id' => ['required', 'exists:businesses,id'],
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('product_categories', 'name')
                    ->where('business_id', $this->business_id)
                    ->ignore($this->route('product_category')),
            ],
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
            'name.required' => 'Enter a category name.',
            'status.required' => 'Choose a status.',
        ];
    }
}
