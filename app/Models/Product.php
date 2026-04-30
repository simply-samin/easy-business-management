<?php

namespace App\Models;

use App\Enums\RecordStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Product extends Model
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'business_id',
        'product_category_id',
        'name',
        'brand',
        'gsm',
        'size_label',
        'base_unit_of_measurement_id',
        'sku',
        'description',
        'status',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'status' => RecordStatus::class,
            'gsm' => 'integer',
        ];
    }

    /**
     * Get the business that owns the product.
     *
     * @return BelongsTo<Business, $this>
     */
    public function business(): BelongsTo
    {
        return $this->belongsTo(Business::class);
    }

    /**
     * Get the product category that owns the product.
     *
     * @return BelongsTo<ProductCategory, $this>
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(ProductCategory::class, 'product_category_id');
    }

    /**
     * Get the base unit of measurement for the product.
     *
     * @return BelongsTo<UnitOfMeasurement, $this>
     */
    public function baseUnitOfMeasurement(): BelongsTo
    {
        return $this->belongsTo(UnitOfMeasurement::class, 'base_unit_of_measurement_id');
    }

    /**
     * Get all unit conversions for the product.
     *
     * @return HasMany<ProductUnitConversion, $this>
     */
    public function unitConversions(): HasMany
    {
        return $this->hasMany(ProductUnitConversion::class);
    }

    /**
     * Get active unit conversions for the product.
     *
     * @return HasMany<ProductUnitConversion, $this>
     */
    public function activeUnitConversions(): HasMany
    {
        return $this->hasMany(ProductUnitConversion::class)->where('status', 'active');
    }

    /**
     * Get the base unit conversion for the product.
     *
     * @return HasOne<ProductUnitConversion, $this>
     */
    public function baseUnitConversion(): HasOne
    {
        return $this->hasOne(ProductUnitConversion::class)->where('is_base_unit', true);
    }

    /**
     * Get the default purchase unit conversion for the product.
     *
     * @return HasOne<ProductUnitConversion, $this>
     */
    public function defaultPurchaseUnitConversion(): HasOne
    {
        return $this->hasOne(ProductUnitConversion::class)->where('is_default_purchase_unit', true);
    }

    /**
     * Get the default sale unit conversion for the product.
     *
     * @return HasOne<ProductUnitConversion, $this>
     */
    public function defaultSaleUnitConversion(): HasOne
    {
        return $this->hasOne(ProductUnitConversion::class)->where('is_default_sale_unit', true);
    }

    /**
     * Convert a quantity in the given unit to the base unit quantity.
     */
    public function convertToBaseQuantity(float|int|string $quantity, ProductUnitConversion $conversion): string
    {
        $baseQuantity = (float) $quantity * (float) $conversion->conversion_factor_to_base;

        return (string) $baseQuantity;
    }

    /**
     * Get the purchase items for the product.
     *
     * @return HasMany<PurchaseItem, $this>
     */
    public function purchaseItems(): HasMany
    {
        return $this->hasMany(PurchaseItem::class);
    }

    /**
     * Get the stock ledgers for the product.
     *
     * @return HasMany<ProductStockLedger, $this>
     */
    public function stockLedgers(): HasMany
    {
        return $this->hasMany(ProductStockLedger::class);
    }

    /**
     * Get the stock snapshots for the product.
     *
     * @return HasMany<ProductStock, $this>
     */
    public function stocks(): HasMany
    {
        return $this->hasMany(ProductStock::class);
    }
}
