<?php

namespace App\Enums;

enum BusinessType: string
{
    case SoleProprietorship = 'sole_proprietorship';
    case Partnership = 'partnership';
    case PrivateLimited = 'private_limited';
    case Other = 'other';

    public function label(): string
    {
        return match ($this) {
            self::SoleProprietorship => 'Sole Proprietorship',
            self::Partnership => 'Partnership',
            self::PrivateLimited => 'Private Limited',
            self::Other => 'Other',
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
