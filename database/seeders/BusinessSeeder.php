<?php

namespace Database\Seeders;

use App\Models\Business;
use App\Models\Outlet;
use Illuminate\Database\Seeder;

class BusinessSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Business::factory()
            ->count(35)
            ->has(Outlet::factory()->count(fake()->numberBetween(1, 4)))
            ->create();
    }
}
