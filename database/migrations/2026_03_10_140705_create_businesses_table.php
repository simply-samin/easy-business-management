<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('businesses', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('trade_name')->nullable();
            $table->string('business_type');
            $table->string('mobile');
            $table->string('email')->nullable();
            $table->string('trade_license_no')->nullable();
            $table->string('tin_no')->nullable();
            $table->string('bin_no')->nullable();
            $table->text('address_line')->nullable();
            $table->string('district')->nullable();
            $table->string('area_type')->nullable();
            $table->string('area_name')->nullable();
            $table->string('postal_code')->nullable();
            $table->string('status');
            $table->timestamps();

            $table->index('name');
            $table->index('mobile');
        });

        $this->seed();
    }

    private function seed(): void
    {
        $now = now();

        DB::table('businesses')->insert([
            [
                'name' => 'Arambag Paper House',
                'trade_name' => 'Arambag Paper House',
                'business_type' => 'sole_proprietorship',
                'mobile' => '01711111111',
                'email' => null,
                'trade_license_no' => null,
                'tin_no' => null,
                'bin_no' => null,
                'address_line' => null,
                'district' => null,
                'area_type' => null,
                'area_name' => null,
                'postal_code' => null,
                'status' => 'active',
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('businesses');
    }
};
