<?php

namespace App\Models;

use App\Enums\RecordStatus;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Product extends Model
{
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
     * The accessors to append to the model's array form.
     *
     * @var list<string>
     */
    protected $appends = [
        'status_label',
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

    protected function statusLabel(): Attribute
    {
        return Attribute::get(fn (): ?string => $this->status?->label());
    }

    public function business(): BelongsTo
    {
        return $this->belongsTo(Business::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(ProductCategory::class, 'product_category_id');
    }

    public function baseUnitOfMeasurement(): BelongsTo
    {
        return $this->belongsTo(UnitOfMeasurement::class, 'base_unit_of_measurement_id');
    }

    public function unitConversions(): HasMany
    {
        return $this->hasMany(ProductUnitConversion::class);
    }

    public function activeUnitConversions(): HasMany
    {
        return $this->hasMany(ProductUnitConversion::class)->where('status', 'active');
    }

    public function baseUnitConversion(): HasOne
    {
        return $this->hasOne(ProductUnitConversion::class)->where('is_base_unit', true);
    }

    public function defaultPurchaseUnitConversion(): HasOne
    {
        return $this->hasOne(ProductUnitConversion::class)->where('is_default_purchase_unit', true);
    }

    public function defaultSaleUnitConversion(): HasOne
    {
        return $this->hasOne(ProductUnitConversion::class)->where('is_default_sale_unit', true);
    }

    public function purchaseItems(): HasMany
    {
        return $this->hasMany(PurchaseItem::class);
    }

    public function stockLedgers(): HasMany
    {
        return $this->hasMany(ProductStockLedger::class);
    }

    public function stocks(): HasMany
    {
        return $this->hasMany(ProductStock::class);
    }

    public function convertToBaseQuantity(float|int|string $quantity, ProductUnitConversion $conversion): string
    {
        $baseQuantity = (float) $quantity * (float) $conversion->conversion_factor_to_base;

        return (string) $baseQuantity;
    }
}
