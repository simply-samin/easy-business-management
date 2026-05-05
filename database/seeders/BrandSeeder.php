<?php

namespace Database\Seeders;

use App\Enums\RecordStatus;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = now();

        DB::table('brands')->upsert(
            array_map(
                fn (string $name): array => [
                    'name' => $name,
                    'status' => RecordStatus::Active->value,
                    'created_at' => $now,
                    'updated_at' => $now,
                ],
                $this->brands(),
            ),
            ['name'],
            ['status', 'updated_at']
        );
    }

    /**
     * @return list<string>
     */
    private function brands(): array
    {
        return [
            'Local Mill',
            'Bashundhara',
            'PaperOne',
            'Double A',
            'Sonali',
            'Charta',
            'Century',
        ];
    }
}
