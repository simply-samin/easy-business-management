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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('business_id')
                ->constrained()
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('product_category_id')
                ->constrained()
                ->cascadeOnUpdate()
                ->restrictOnDelete();
            $table->string('name');
            $table->string('brand')->nullable();
            $table->unsignedSmallInteger('gsm')->nullable();
            $table->string('size_label')->nullable();
            $table->foreignId('base_unit_of_measurement_id')
                ->constrained('unit_of_measurements')
                ->cascadeOnUpdate()
                ->restrictOnDelete();
            $table->string('sku')->nullable();
            $table->text('description')->nullable();
            $table->string('status')->default('active');
            $table->timestamps();

            $table->unique(['business_id', 'sku']);
            $table->index('business_id');
            $table->index('product_category_id');
            $table->index('brand');
            $table->index('gsm');
            $table->index('size_label');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
