<?php

namespace App\Enums;

enum PartyType: string
{
    case Customer = 'customer';
    case Supplier = 'supplier';
    case Both = 'both';

    public function label(): string
    {
        return match ($this) {
            self::Customer => 'Customer',
            self::Supplier => 'Supplier',
            self::Both => 'Both',
        };
    }

    /**
     * @return array<int, array{label: string, value: string}>
     */
    public static function options(): array
    {
        return array_map(
            fn (self $case): array => [
                'label' => $case->label(),
                'value' => $case->value,
            ],
            self::cases()
        );
    }
}
