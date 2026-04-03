<?php

namespace App\Http\Controllers;

use App\Enums\AreaType;
use App\Enums\BusinessStatus;
use App\Enums\BusinessType;
use App\Enums\OutletStatus;
use App\Enums\OutletType;
use App\Http\Requests\StoreBusinessRequest;
use App\Http\Requests\UpdateBusinessRequest;
use App\Models\Business;
use BackedEnum;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class BusinessController extends Controller
{
    /**
     * Display a listing of the resource.
     */
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
            'filters' => [
                'search' => $search !== '' ? $search : null,
                'sort' => $sort,
                'direction' => $direction,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('businesses/create', [
            'businessTypeOptions' => $this->enumOptions(BusinessType::class),
            'statusOptions' => $this->enumOptions(BusinessStatus::class),
            'areaTypeOptions' => $this->enumOptions(AreaType::class),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBusinessRequest $request): RedirectResponse
    {
        $business = Business::create($request->validated());

        return to_route('businesses.show', $business)
            ->with('status', 'Business created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Business $business): Response
    {
        $business->load([
            'outlets' => fn ($query) => $query->orderBy('name'),
        ]);

        return Inertia::render('businesses/show', [
            'business' => $business,
            'outletTypeOptions' => $this->enumOptions(OutletType::class),
            'outletStatusOptions' => $this->enumOptions(OutletStatus::class),
            'areaTypeOptions' => $this->enumOptions(AreaType::class),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Business $business): Response
    {
        return Inertia::render('businesses/edit', [
            'business' => $business,
            'businessTypeOptions' => $this->enumOptions(BusinessType::class),
            'statusOptions' => $this->enumOptions(BusinessStatus::class),
            'areaTypeOptions' => $this->enumOptions(AreaType::class),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBusinessRequest $request, Business $business): RedirectResponse
    {
        $business->update($request->validated());

        return to_route('businesses.show', $business)
            ->with('status', 'Business updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
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
