<?php

namespace App\Models;

use App\Enums\AreaType;
use App\Enums\BusinessType;
use App\Enums\RecordStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Business extends Model
{
    /** @use HasFactory<\Database\Factories\BusinessFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'trade_name',
        'business_type',
        'mobile',
        'email',
        'trade_license_no',
        'tin_no',
        'bin_no',
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
            'business_type' => BusinessType::class,
            'area_type' => AreaType::class,
            'status' => RecordStatus::class,
        ];
    }

    /**
     * Get the outlets for the business.
     *
     * @return HasMany<Outlet, $this>
     */
    public function outlets(): HasMany
    {
        return $this->hasMany(Outlet::class);
    }

    /**
     * Get the product categories for the business.
     *
     * @return HasMany<ProductCategory, $this>
     */
    public function productCategories(): HasMany
    {
        return $this->hasMany(ProductCategory::class);
    }

    /**
     * Get the products for the business.
     *
     * @return HasMany<Product, $this>
     */
    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }

    /**
     * Get the parties for the business.
     *
     * @return HasMany<Party, $this>
     */
    public function parties(): HasMany
    {
        return $this->hasMany(Party::class);
    }

    /**
     * Get the purchases for the business.
     *
     * @return HasMany<Purchase, $this>
     */
    public function purchases(): HasMany
    {
        return $this->hasMany(Purchase::class);
    }

    /**
     * Get the product stock ledgers for the business.
     *
     * @return HasMany<ProductStockLedger, $this>
     */
    public function productStockLedgers(): HasMany
    {
        return $this->hasMany(ProductStockLedger::class);
    }

    /**
     * Get the product stocks for the business.
     *
     * @return HasMany<ProductStock, $this>
     */
    public function productStocks(): HasMany
    {
        return $this->hasMany(ProductStock::class);
    }
}
