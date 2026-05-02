<?php

namespace App\Http\Requests;

use App\Enums\AreaType;
use App\Enums\OpeningBalanceType;
use App\Enums\PartyType;
use App\Enums\RecordStatus;
use App\Models\Business;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SavePartyRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255'],
            'trade_name' => ['nullable', 'string', 'max:255'],
            'mobile' => ['nullable', 'string', 'max:20'],
            'email' => ['nullable', 'email', 'max:255'],
            'party_type' => ['required', Rule::enum(PartyType::class)],
            'address_line' => ['nullable', 'string', 'max:1000'],
            'district' => ['nullable', 'string', 'max:255'],
            'area_type' => ['nullable', Rule::enum(AreaType::class), 'required_with:area_name'],
            'area_name' => ['nullable', 'string', 'max:255', 'required_with:area_type'],
            'postal_code' => ['nullable', 'string', 'max:20'],
            'opening_balance' => ['nullable', 'numeric', 'min:0'],
            'opening_balance_type' => ['required', Rule::enum(OpeningBalanceType::class)],
            'credit_limit' => ['nullable', 'numeric', 'min:0'],
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
            'name.required' => 'Enter a party name.',
            'party_type.required' => 'Choose a party type.',
            'area_type.required_with' => 'Choose whether the area is an upazila or thana.',
            'area_name.required_with' => 'Enter the selected area name.',
            'opening_balance_type.required' => 'Choose an opening balance type.',
            'status.required' => 'Choose a status.',
        ];
    }
}
