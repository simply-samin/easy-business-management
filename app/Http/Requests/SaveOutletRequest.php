<?php

namespace App\Http\Requests;

use App\Enums\AreaType;
use App\Enums\OutletType;
use App\Enums\RecordStatus;
use App\Models\Business;
use App\Models\Outlet;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SaveOutletRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        /** @var Business $business */
        $business = $this->route('business');
        /** @var Outlet|null $outlet */
        $outlet = $this->route('outlet');

        return [
            'name' => ['required', 'string', 'max:255'],
            'code' => [
                'nullable',
                'string',
                'max:50',
                Rule::unique(Outlet::class, 'code')
                    ->where(fn ($query) => $query->where('business_id', $business->id))
                    ->ignore($outlet?->id),
            ],
            'mobile' => ['required', 'string', 'max:20'],
            'email' => ['nullable', 'email', 'max:255'],
            'outlet_type' => ['nullable', Rule::enum(OutletType::class)],
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
            'name.required' => 'Enter an outlet name.',
            'mobile.required' => 'Enter an outlet mobile number.',
            'status.required' => 'Choose an outlet status.',
            'code.unique' => 'This outlet code is already in use for the selected business.',
            'area_type.required_with' => 'Choose whether the area is an upazila or thana.',
            'area_name.required_with' => 'Enter the selected area name.',
        ];
    }
}
