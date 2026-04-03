<?php

namespace App\Models;

use App\Enums\AreaType;
use App\Enums\BusinessStatus;
use App\Enums\BusinessType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;

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
            'status' => BusinessStatus::class,
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
}
