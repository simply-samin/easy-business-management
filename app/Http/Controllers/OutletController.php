<?php

namespace App\Http\Controllers;

use App\Enums\AreaType;
use App\Enums\OutletStatus;
use App\Enums\OutletType;
use App\Http\Requests\StoreOutletRequest;
use App\Http\Requests\UpdateOutletRequest;
use App\Models\Business;
use App\Models\Outlet;
use BackedEnum;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class OutletController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create(Business $business): Response
    {
        return Inertia::render('outlets/create', [
            'business' => $business,
            'outletTypeOptions' => $this->enumOptions(OutletType::class),
            'statusOptions' => $this->enumOptions(OutletStatus::class),
            'areaTypeOptions' => $this->enumOptions(AreaType::class),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOutletRequest $request, Business $business): RedirectResponse
    {
        $business->outlets()->create($request->validated());

        return to_route('businesses.show', $business)
            ->with('status', 'Outlet created successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Business $business, Outlet $outlet): Response
    {
        return Inertia::render('outlets/edit', [
            'business' => $business,
            'outlet' => $outlet,
            'outletTypeOptions' => $this->enumOptions(OutletType::class),
            'statusOptions' => $this->enumOptions(OutletStatus::class),
            'areaTypeOptions' => $this->enumOptions(AreaType::class),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOutletRequest $request, Business $business, Outlet $outlet): RedirectResponse
    {
        $outlet->update($request->validated());

        return to_route('businesses.show', $business)
            ->with('status', 'Outlet updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Business $business, Outlet $outlet): RedirectResponse
    {
        $outlet->delete();

        return to_route('businesses.show', $business)
            ->with('status', 'Outlet deleted successfully.');
    }

    /**
     * Transform enum cases into frontend-friendly option arrays.
     *
     * @param  class-string<BackedEnum>  $enumClass
     * @return array<int, array{label: string, value: string}>
     */
    private function enumOptions(string $enumClass): array
    {
        return array_map(
            fn (BackedEnum $case): array => [
                'label' => Str::headline($case->value),
                'value' => $case->value,
            ],
            $enumClass::cases(),
        );
    }
}
