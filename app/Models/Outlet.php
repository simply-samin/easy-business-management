<?php

namespace App\Models;

use App\Enums\AreaType;
use App\Enums\OutletType;
use App\Enums\RecordStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Outlet extends Model
{
    /** @use HasFactory<\Database\Factories\OutletFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'business_id',
        'name',
        'code',
        'mobile',
        'email',
        'outlet_type',
        'address_line',
        'district',
        'area_type',
        'area_name',
        'postal_code',
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
            'outlet_type' => OutletType::class,
            'area_type' => AreaType::class,
            'status' => RecordStatus::class,
        ];
    }

    /**
     * Get the business that owns the outlet.
     *
     * @return BelongsTo<Business, $this>
     */
    public function business(): BelongsTo
    {
        return $this->belongsTo(Business::class);
    }

    /**
     * Get the purchases for the outlet.
     *
     * @return HasMany<Purchase, $this>
     */
    public function purchases(): HasMany
    {
        return $this->hasMany(Purchase::class);
    }

    /**
     * Get the product stock ledgers for the outlet.
     *
     * @return HasMany<ProductStockLedger, $this>
     */
    public function productStockLedgers(): HasMany
    {
        return $this->hasMany(ProductStockLedger::class);
    }

    /**
     * Get the product stocks for the outlet.
     *
     * @return HasMany<ProductStock, $this>
     */
    public function productStocks(): HasMany
    {
        return $this->hasMany(ProductStock::class);
    }
}
