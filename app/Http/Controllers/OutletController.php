<?php

namespace App\Http\Controllers;

use App\Enums\AreaType;
use App\Enums\OutletType;
use App\Enums\RecordStatus;
use App\Http\Requests\SaveOutletRequest;
use App\Models\Business;
use App\Models\Outlet;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class OutletController extends Controller
{
    public function create(Business $business): Response
    {
        return Inertia::render('outlets/create', [
            'business' => $business,
            'outletTypeOptions' => OutletType::class::options(),
            'statusOptions' => RecordStatus::options(),
            'areaTypeOptions' => AreaType::class::options(),
        ]);
    }

    public function store(SaveOutletRequest $request, Business $business): RedirectResponse
    {
        $business->outlets()->create($request->validated());

        return to_route('business.show')
            ->with('status', 'Outlet created successfully.');
    }

    public function edit(Business $business, Outlet $outlet): Response
    {
        return Inertia::render('outlets/edit', [
            'business' => $business,
            'outlet' => $outlet,
            'outletTypeOptions' => OutletType::class::options(),
            'statusOptions' => RecordStatus::options(),
            'areaTypeOptions' => AreaType::class::options(),
        ]);
    }

    public function update(SaveOutletRequest $request, Business $business, Outlet $outlet): RedirectResponse
    {
        $outlet->update($request->validated());

        return to_route('business.show')
            ->with('status', 'Outlet updated successfully.');
    }

    public function destroy(Business $business, Outlet $outlet): RedirectResponse
    {
        $outlet->delete();

        return to_route('business.show')
            ->with('status', 'Outlet deleted successfully.');
    }
}
