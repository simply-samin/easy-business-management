<?php

namespace App\Enums;

enum ProductStockLedgerTransactionType: string
{
    case Purchase = 'purchase';
    case Sale = 'sale';
    case AdjustmentIn = 'adjustment_in';
    case AdjustmentOut = 'adjustment_out';
    case TransferIn = 'transfer_in';
    case TransferOut = 'transfer_out';
    case OpeningStock = 'opening_stock';

    public function label(): string
    {
        return match ($this) {
            self::Purchase => 'Purchase',
            self::Sale => 'Sale',
            self::AdjustmentIn => 'Adjustment In',
            self::AdjustmentOut => 'Adjustment Out',
            self::TransferIn => 'Transfer In',
            self::TransferOut => 'Transfer Out',
            self::OpeningStock => 'Opening Stock',
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
