<?php

namespace App\Enums;

enum OpeningBalanceType: string
{
    case None = 'none';
    case Receivable = 'receivable';
    case Payable = 'payable';

    public function label(): string
    {
        return match ($this) {
            self::None => 'None',
            self::Receivable => 'Receivable',
            self::Payable => 'Payable',
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
