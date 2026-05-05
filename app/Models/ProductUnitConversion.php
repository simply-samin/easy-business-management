<?php

namespace App\Models;

use App\Enums\RecordStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProductUnitConversion extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'product_id',
        'unit_of_measurement_id',
        'conversion_factor_to_base',
        'is_base_unit',
        'is_default_purchase_unit',
        'is_default_sale_unit',
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
            'conversion_factor_to_base' => 'decimal:6',
            'is_base_unit' => 'boolean',
            'is_default_purchase_unit' => 'boolean',
            'is_default_sale_unit' => 'boolean',
            'status' => RecordStatus::class,
        ];
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function unitOfMeasurement(): BelongsTo
    {
        return $this->belongsTo(UnitOfMeasurement::class);
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
