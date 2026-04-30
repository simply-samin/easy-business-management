<?php

namespace App\Models;

use App\Enums\AreaType;
use App\Enums\OpeningBalanceType;
use App\Enums\PartyType;
use App\Enums\RecordStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Party extends Model
{
    /** @use HasFactory<\Database\Factories\PartyFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'business_id',
        'name',
        'trade_name',
        'mobile',
        'email',
        'party_type',
        'address_line',
        'district',
        'area_type',
        'area_name',
        'postal_code',
        'opening_balance',
        'opening_balance_type',
        'credit_limit',
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
            'party_type' => PartyType::class,
            'opening_balance_type' => OpeningBalanceType::class,
            'status' => RecordStatus::class,
            'opening_balance' => 'decimal:2',
            'credit_limit' => 'decimal:2',
            'area_type' => AreaType::class,
        ];
    }

    /**
     * Get the business that owns the party.
     *
     * @return BelongsTo<Business, $this>
     */
    public function business(): BelongsTo
    {
        return $this->belongsTo(Business::class);
    }

    /**
     * Get the contact persons for the party.
     *
     * @return HasMany<PartyContactPerson, $this>
     */
    public function contactPersons(): HasMany
    {
        return $this->hasMany(PartyContactPerson::class);
    }

    /**
     * Get the active contact persons for the party.
     *
     * @return HasMany<PartyContactPerson, $this>
     */
    public function activeContactPersons(): HasMany
    {
        return $this->hasMany(PartyContactPerson::class)->where('status', 'active');
    }

    /**
     * Get the primary contact person for the party.
     *
     * @return HasOne<PartyContactPerson, $this>
     */
    public function primaryContactPerson(): HasOne
    {
        return $this->hasOne(PartyContactPerson::class)->where('is_primary', true);
    }

    /**
     * Get the purchases where this party is the supplier.
     *
     * @return HasMany<Purchase, $this>
     */
    public function supplierPurchases(): HasMany
    {
        return $this->hasMany(Purchase::class, 'supplier_party_id');
    }
}
