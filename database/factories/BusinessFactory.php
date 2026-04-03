<?php

namespace Database\Factories;

use App\Enums\AreaType;
use App\Enums\BusinessStatus;
use App\Enums\BusinessType;
use App\Models\Business;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Business>
 */
class BusinessFactory extends Factory
{
    protected $model = Business::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->company(),
            'trade_name' => fake()->optional()->companySuffix(),
            'business_type' => fake()->randomElement(BusinessType::cases()),
            'mobile' => '01'.fake()->numerify('#########'),
            'email' => fake()->optional()->safeEmail(),
            'trade_license_no' => fake()->optional()->bothify('TL-#######'),
            'tin_no' => fake()->optional()->numerify('###########'),
            'bin_no' => fake()->optional()->numerify('#############'),
            'address_line' => fake()->optional()->streetAddress(),
            'district' => fake()->optional()->city(),
            'area_type' => fake()->optional()->randomElement(AreaType::cases()),
            'area_name' => fake()->optional()->citySuffix(),
            'postal_code' => fake()->optional()->postcode(),
            'status' => fake()->randomElement(BusinessStatus::cases()),
        ];
    }
}
