<?php

namespace App\Http\Controllers;

use App\Enums\AreaType;
use App\Enums\BusinessType;
use App\Enums\OutletType;
use App\Enums\RecordStatus;
use App\Http\Requests\SaveBusinessRequest;
use App\Models\Business;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class BusinessController extends Controller
{
    public function show(): Response
    {
        $business = Business::current();

        $business->load([
            'outlets' => fn ($query) => $query->orderBy('name'),
        ]);

        return Inertia::render('businesses/show', [
            'business' => $business,
            'outletTypeOptions' => OutletType::options(),
            'outletStatusOptions' => RecordStatus::options(),
            'areaTypeOptions' => AreaType::options(),
        ]);
    }

    public function edit(): Response
    {
        $business = Business::current();

        return Inertia::render('businesses/edit', [
            'business' => $business,
            'businessTypeOptions' => BusinessType::options(),
            'statusOptions' => RecordStatus::options(),
            'areaTypeOptions' => AreaType::options(),
        ]);
    }

    public function update(SaveBusinessRequest $request): RedirectResponse
    {
        $business = Business::current();

        $business->update($request->validated());

        return to_route('business.show')
            ->with('status', 'Business updated successfully.');
    }
}
