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
        Schema::create('unit_of_measurements', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('code')->unique();
            $table->string('type')->nullable();
            $table->string('status')->default('active');
            $table->timestamps();
        });

        $this->seed();
    }

    private function seed(): void
    {
        $now = now();

        DB::table('unit_of_measurements')->insertOrIgnore([
            [
                'name' => 'Ream',
                'code' => 'ream',
                'type' => 'count',
                'status' => 'active',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Sheet',
                'code' => 'sheet',
                'type' => 'count',
                'status' => 'active',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'KG',
                'code' => 'kg',
                'type' => 'weight',
                'status' => 'active',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Roll',
                'code' => 'roll',
                'type' => 'count',
                'status' => 'active',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Carton',
                'code' => 'carton',
                'type' => 'count',
                'status' => 'active',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Bundle',
                'code' => 'bundle',
                'type' => 'count',
                'status' => 'active',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Packet',
                'code' => 'packet',
                'type' => 'count',
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
        Schema::dropIfExists('unit_of_measurements');
    }
};
