<?php

namespace Database\Factories;

use App\Enums\AreaType;
use App\Enums\OutletType;
use App\Enums\RecordStatus;
use App\Models\Business;
use App\Models\Outlet;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Outlet>
 */
class OutletFactory extends Factory
{
    protected $model = Outlet::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'business_id' => Business::factory(),
            'name' => fake()->company().' Outlet',
            'code' => fake()->unique()->bothify('OUT-####'),
            'mobile' => '01'.fake()->numerify('#########'),
            'email' => fake()->optional()->safeEmail(),
            'outlet_type' => fake()->randomElement(OutletType::cases()),
            'address_line' => fake()->optional()->streetAddress(),
            'district' => fake()->optional()->city(),
            'area_type' => fake()->optional()->randomElement(AreaType::cases()),
            'area_name' => fake()->optional()->citySuffix(),
            'postal_code' => fake()->optional()->postcode(),
            'status' => fake()->randomElement(RecordStatus::cases()),
        ];
    }
}
