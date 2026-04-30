<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('parties', function (Blueprint $table) {
            $table->id();
            $table->foreignId('business_id')
                ->constrained()
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->string('name');
            $table->string('trade_name')->nullable();
            $table->string('mobile')->nullable();
            $table->string('email')->nullable();
            $table->string('party_type')->default('customer');
            $table->string('address_line')->nullable();
            $table->string('district')->nullable();
            $table->string('area_type')->nullable();
            $table->string('area_name')->nullable();
            $table->string('postal_code')->nullable();
            $table->decimal('opening_balance', 15, 2)->default(0);
            $table->string('opening_balance_type')->default('none');
            $table->decimal('credit_limit', 15, 2)->nullable();
            $table->string('status')->default('active');
            $table->timestamps();

            $table->index('business_id');
            $table->index('name');
            $table->index('mobile');
            $table->index('email');
            $table->index('party_type');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('parties');
    }
};
