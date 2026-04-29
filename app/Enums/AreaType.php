<?php

namespace App\Enums;

enum AreaType: string
{
    case Upazila = 'upazila';
    case Thana = 'thana';

    public function label(): string
    {
        return match ($this) {
            self::Upazila => 'Upazila',
            self::Thana => 'Thana',
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
