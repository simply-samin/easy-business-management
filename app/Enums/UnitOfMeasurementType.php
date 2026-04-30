<?php

namespace App\Enums;

enum UnitOfMeasurementType: string
{
    case Count = 'count';
    case Weight = 'weight';
    case Length = 'length';
    case Area = 'area';
    case Volume = 'volume';

    public function label(): string
    {
        return match ($this) {
            self::Count => 'Count',
            self::Weight => 'Weight',
            self::Length => 'Length',
            self::Area => 'Area',
            self::Volume => 'Volume',
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
