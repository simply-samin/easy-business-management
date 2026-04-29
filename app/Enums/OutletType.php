<?php

namespace App\Enums;

enum OutletType: string
{
    case Shop = 'shop';
    case Office = 'office';
    case Warehouse = 'warehouse';
    case Online = 'online';

    public function label(): string
    {
        return match ($this) {
            self::Shop => 'Shop',
            self::Office => 'Office',
            self::Warehouse => 'Warehouse',
            self::Online => 'Online',
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
