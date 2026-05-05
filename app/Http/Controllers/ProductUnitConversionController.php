<?php

namespace App\Http\Controllers;

use App\Http\Requests\SaveProductUnitConversionRequest;
use App\Models\Business;
use App\Models\Product;
use App\Models\ProductUnitConversion;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\ValidationException;

class ProductUnitConversionController extends Controller
{
    public function store(SaveProductUnitConversionRequest $request, Product $product): RedirectResponse
    {
        $this->ensureCurrentBusinessProduct($product);

        $data = $request->validated();
        $this->clearDefaultFlags($product, $data);

        $productUnitConversion = $product->unitConversions()->create($data);

        return to_route('products.edit', $product)
            ->with('status', "Unit conversion for {$productUnitConversion->unitOfMeasurement?->name} created successfully.");
    }

    public function update(
        SaveProductUnitConversionRequest $request,
        Product $product,
        ProductUnitConversion $productUnitConversion,
    ): RedirectResponse {
        $this->ensureProductConversionOwnership($product, $productUnitConversion);

        $data = $request->validated();
        $this->clearDefaultFlags($product, $data, $productUnitConversion);

        $productUnitConversion->update($data);

        return to_route('products.edit', $product)
            ->with('status', 'Unit conversion updated successfully.');
    }

    public function destroy(Product $product, ProductUnitConversion $productUnitConversion): RedirectResponse
    {
        $this->ensureProductConversionOwnership($product, $productUnitConversion);

        if ($productUnitConversion->is_base_unit) {
            throw ValidationException::withMessages([
                'product_unit_conversion' => 'Cannot delete the base unit conversion.',
            ]);
        }

        if ($productUnitConversion->purchaseItems()->exists() || $productUnitConversion->productStockLedgers()->exists()) {
            throw ValidationException::withMessages([
                'product_unit_conversion' => 'Cannot delete this unit conversion because it is used in purchases or stock records.',
            ]);
        }

        $productUnitConversion->delete();

        return to_route('products.edit', $product)
            ->with('status', 'Unit conversion deleted successfully.');
    }

    /**
     * @param  array<string, mixed>  $data
     */
    private function clearDefaultFlags(
        Product $product,
        array $data,
        ?ProductUnitConversion $productUnitConversion = null,
    ): void {
        if (($data['is_default_purchase_unit'] ?? false) === true) {
            $product->unitConversions()
                ->when($productUnitConversion, fn ($query) => $query->whereKeyNot($productUnitConversion->id))
                ->update(['is_default_purchase_unit' => false]);
        }

        if (($data['is_default_sale_unit'] ?? false) === true) {
            $product->unitConversions()
                ->when($productUnitConversion, fn ($query) => $query->whereKeyNot($productUnitConversion->id))
                ->update(['is_default_sale_unit' => false]);
        }
    }

    private function ensureCurrentBusinessProduct(Product $product): void
    {
        abort_unless($product->business_id === Business::current()->id, 404);
    }

    private function ensureProductConversionOwnership(
        Product $product,
        ProductUnitConversion $productUnitConversion,
    ): void {
        $this->ensureCurrentBusinessProduct($product);
        abort_unless($productUnitConversion->product_id === $product->id, 404);
    }
}
