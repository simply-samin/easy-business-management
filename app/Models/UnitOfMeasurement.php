<?php

namespace App\Models;

use App\Enums\RecordStatus;
use App\Enums\UnitOfMeasurementType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class UnitOfMeasurement extends Model
{
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

    public function baseUnitProducts(): HasMany
    {
        return $this->hasMany(Product::class, 'base_unit_of_measurement_id');
    }

    public function productUnitConversions(): HasMany
    {
        return $this->hasMany(ProductUnitConversion::class);
    }

    public function purchaseItems(): HasMany
    {
        return $this->hasMany(PurchaseItem::class);
    }

    public function productStockLedgers(): HasMany
    {
        return $this->hasMany(ProductStockLedger::class);
    }
}
