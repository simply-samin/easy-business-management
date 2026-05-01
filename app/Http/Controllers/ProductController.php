<?php

namespace App\Http\Controllers;

use App\Enums\RecordStatus;
use App\Http\Requests\SaveProductRequest;
use App\Models\Business;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\UnitOfMeasurement;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
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

        $products = Product::query()
            ->with(['business:id,name', 'category:id,name', 'baseUnitOfMeasurement:id,name,code'])
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('brand', 'like', "%{$search}%")
                        ->orWhere('sku', 'like', "%{$search}%");
                });
            })
            ->orderBy($sort, $direction)
            ->orderBy('id', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('products/index', [
            'products' => $products,
            'queryString' => [
                'search' => $search !== '' ? $search : null,
                'sort' => $sort,
                'direction' => $direction,
            ],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('products/create', [
            'businesses' => Business::query()
                ->orderBy('name')
                ->get(['id', 'name']),
            'productCategories' => ProductCategory::query()
                ->with('business:id,name')
                ->orderBy('name')
                ->get(['id', 'business_id', 'name']),
            'unitOfMeasurements' => UnitOfMeasurement::query()
                ->orderBy('name')
                ->get(['id', 'name', 'code']),
            'statusOptions' => RecordStatus::options(),
        ]);
    }

    public function store(SaveProductRequest $request): RedirectResponse
    {
        Product::create($request->validated());

        return to_route('products.index')
            ->with('status', 'Product created successfully.');
    }

    public function edit(Product $product): Response
    {
        return Inertia::render('products/edit', [
            'product' => $product,
            'businesses' => Business::query()
                ->orderBy('name')
                ->get(['id', 'name']),
            'productCategories' => ProductCategory::query()
                ->with('business:id,name')
                ->orderBy('name')
                ->get(['id', 'business_id', 'name']),
            'unitOfMeasurements' => UnitOfMeasurement::query()
                ->orderBy('name')
                ->get(['id', 'name', 'code']),
            'statusOptions' => RecordStatus::options(),
        ]);
    }

    public function update(SaveProductRequest $request, Product $product): RedirectResponse
    {
        $product->update($request->validated());

        return to_route('products.index')
            ->with('status', 'Product updated successfully.');
    }

    public function destroy(Product $product): RedirectResponse
    {
        if ($product->purchaseItems()->exists() || $product->stocks()->exists()) {
            throw ValidationException::withMessages([
                'product' => 'Delete the related purchase items or stocks before deleting this product.',
            ]);
        }

        $product->delete();

        return to_route('products.index')
            ->with('status', 'Product deleted successfully.');
    }
}
