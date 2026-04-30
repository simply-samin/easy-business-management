<?php

namespace App\Models;

use App\Enums\RecordStatus;
use App\Enums\UnitOfMeasurementType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class UnitOfMeasurement extends Model
{
    /** @use HasFactory<\Database\Factories\UnitOfMeasurementFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'code',
        'type',
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
            'type' => UnitOfMeasurementType::class,
            'status' => RecordStatus::class,
        ];
    }

    /**
     * Get the products that use this unit as their base unit.
     *
     * @return HasMany<Product, $this>
     */
    public function baseUnitProducts(): HasMany
    {
        return $this->hasMany(Product::class, 'base_unit_of_measurement_id');
    }

    /**
     * Get the product unit conversions that use this unit.
     *
     * @return HasMany<ProductUnitConversion, $this>
     */
    public function productUnitConversions(): HasMany
    {
        return $this->hasMany(ProductUnitConversion::class);
    }

    /**
     * Get the purchase items that use this unit.
     *
     * @return HasMany<PurchaseItem, $this>
     */
    public function purchaseItems(): HasMany
    {
        return $this->hasMany(PurchaseItem::class);
    }

    /**
     * Get the product stock ledgers that use this unit.
     *
     * @return HasMany<ProductStockLedger, $this>
     */
    public function productStockLedgers(): HasMany
    {
        return $this->hasMany(ProductStockLedger::class);
    }
}
