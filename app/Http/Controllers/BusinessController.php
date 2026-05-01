<?php

namespace App\Http\Controllers;

use App\Enums\AreaType;
use App\Enums\BusinessType;
use App\Enums\OutletType;
use App\Enums\RecordStatus;
use App\Http\Requests\SaveBusinessRequest;
use App\Models\Business;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class BusinessController extends Controller
{
    public function index(Request $request): Response
    {
        $search = trim((string) $request->query('search', ''));
        $sort = $request->query('sort', 'created_at');
        $direction = $request->query('direction', 'desc');

        if (! in_array($sort, ['name', 'created_at'], true)) {
            $sort = 'created_at';
        }

        if (! in_array($direction, ['asc', 'desc'], true)) {
            $direction = 'desc';
        }

        $businesses = Business::query()
            ->withCount('outlets')
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('mobile', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->orderBy($sort, $direction)
            ->orderBy('id', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('businesses/index', [
            'businesses' => $businesses,
            'queryString' => [
                'search' => $search !== '' ? $search : null,
                'sort' => $sort,
                'direction' => $direction,
            ],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('businesses/create', [
            'businessTypeOptions' => BusinessType::options(),
            'statusOptions' => RecordStatus::options(),
            'areaTypeOptions' => AreaType::options(),
        ]);
    }

    public function store(SaveBusinessRequest $request): RedirectResponse
    {
        $business = Business::create($request->validated());

        return to_route('businesses.show', $business)
            ->with('status', 'Business created successfully.');
    }

    public function show(Business $business): Response
    {
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

    public function edit(Business $business): Response
    {
        return Inertia::render('businesses/edit', [
            'business' => $business,
            'businessTypeOptions' => BusinessType::options(),
            'statusOptions' => RecordStatus::options(),
            'areaTypeOptions' => AreaType::options(),
        ]);
    }

    public function update(SaveBusinessRequest $request, Business $business): RedirectResponse
    {
        $business->update($request->validated());

        return to_route('businesses.show', $business)
            ->with('status', 'Business updated successfully.');
    }

    public function destroy(Business $business): RedirectResponse
    {
        if ($business->outlets()->exists()) {
            throw ValidationException::withMessages([
                'business' => 'Delete the related outlets before deleting this business.',
            ]);
        }

        $business->delete();

        return to_route('businesses.index')
            ->with('status', 'Business deleted successfully.');
    }
}
