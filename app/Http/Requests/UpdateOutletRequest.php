<?php

namespace App\Http\Requests;

use App\Concerns\OutletValidationRules;
use App\Models\Business;
use App\Models\Outlet;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateOutletRequest extends FormRequest
{
    use OutletValidationRules;

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        /** @var Business $business */
        $business = $this->route('business');
        /** @var Outlet $outlet */
        $outlet = $this->route('outlet');

        return $this->outletRules($business->id, $outlet->id);
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return $this->outletMessages();
    }
}
