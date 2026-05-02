<?php

namespace Database\Seeders;

use App\Enums\RecordStatus;
use App\Models\Business;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\UnitOfMeasurement;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $business = Business::current();

        $categories = ProductCategory::query()
            ->whereBelongsTo($business)
            ->get()
            ->keyBy('name');

        $units = UnitOfMeasurement::query()
            ->whereIn('code', ['ream', 'kg', 'roll', 'bundle'])
            ->get()
            ->keyBy('code');

        foreach ($this->products() as $product) {
            Product::query()->updateOrCreate(
                [
                    'business_id' => $business->id,
                    'sku' => $product['sku'],
                ],
                [
                    'product_category_id' => $categories->get($product['category'])->id,
                    'name' => $product['name'],
                    'brand' => $product['brand'],
                    'gsm' => $product['gsm'],
                    'size_label' => $product['size_label'],
                    'base_unit_of_measurement_id' => $units->get($product['unit'])->id,
                    'description' => $product['description'],
                    'status' => RecordStatus::Active,
                ]
            );
        }
    }

    /**
     * @return list<array{
     *     category: string,
     *     name: string,
     *     brand: string|null,
     *     gsm: int|null,
     *     size_label: string|null,
     *     unit: string,
     *     sku: string,
     *     description: string|null
     * }>
     */
    private function products(): array
    {
        return [
            ['category' => 'Offset Paper', 'name' => 'Offset Paper 55 GSM 23x36', 'brand' => 'Local Mill', 'gsm' => 55, 'size_label' => '23x36', 'unit' => 'ream', 'sku' => 'OFF-55-2336-001', 'description' => 'Economy offset paper for invoice books, forms, and general press work.'],
            ['category' => 'Offset Paper', 'name' => 'Offset Paper 60 GSM 23x36', 'brand' => 'Local Mill', 'gsm' => 60, 'size_label' => '23x36', 'unit' => 'ream', 'sku' => 'OFF-60-2336-002', 'description' => 'Common press-size offset paper for leaflets, pads, and office printing.'],
            ['category' => 'Offset Paper', 'name' => 'Bashundhara Offset 70 GSM 23x36', 'brand' => 'Bashundhara', 'gsm' => 70, 'size_label' => '23x36', 'unit' => 'ream', 'sku' => 'OFF-70-2336-003', 'description' => 'Popular white offset paper for commercial printing in Arambag press shops.'],
            ['category' => 'Offset Paper', 'name' => 'Bashundhara Offset 80 GSM 23x36', 'brand' => 'Bashundhara', 'gsm' => 80, 'size_label' => '23x36', 'unit' => 'ream', 'sku' => 'OFF-80-2336-004', 'description' => 'Bright offset paper for flyers, letterheads, and stationery jobs.'],
            ['category' => 'Offset Paper', 'name' => 'PaperOne A4 Copy Paper 80 GSM', 'brand' => 'PaperOne', 'gsm' => 80, 'size_label' => 'A4', 'unit' => 'ream', 'sku' => 'OFF-80-A4-005', 'description' => 'A4 office copy paper for resale to offices and small print counters.'],
            ['category' => 'Offset Paper', 'name' => 'Double A A4 Copy Paper 80 GSM', 'brand' => 'Double A', 'gsm' => 80, 'size_label' => 'A4', 'unit' => 'ream', 'sku' => 'OFF-80-A4-006', 'description' => 'Premium A4 copy paper for office, school, and photocopy use.'],
            ['category' => 'Offset Paper', 'name' => 'Offset Paper 100 GSM 20x30', 'brand' => 'Local Mill', 'gsm' => 100, 'size_label' => '20x30', 'unit' => 'ream', 'sku' => 'OFF-100-2030-007', 'description' => 'Thicker offset sheet for certificates, menus, and book covers.'],
            ['category' => 'Offset Paper', 'name' => 'Cream Wove Offset 80 GSM 23x36', 'brand' => 'Local Mill', 'gsm' => 80, 'size_label' => '23x36', 'unit' => 'ream', 'sku' => 'OFF-80-CRM-008', 'description' => 'Cream shade offset paper for books, forms, and invitation printing.'],
            ['category' => 'Art Card', 'name' => 'Art Card 230 GSM 23x36', 'brand' => 'Local Mill', 'gsm' => 230, 'size_label' => '23x36', 'unit' => 'ream', 'sku' => 'ART-230-2336-009', 'description' => 'Coated art card for folders, packaging inserts, and promotional print.'],
            ['category' => 'Art Card', 'name' => 'Art Card 250 GSM 23x36', 'brand' => 'Local Mill', 'gsm' => 250, 'size_label' => '23x36', 'unit' => 'ream', 'sku' => 'ART-250-2336-010', 'description' => 'Medium-heavy coated card for business cards, covers, and hang tags.'],
            ['category' => 'Art Card', 'name' => 'Art Card 260 GSM 20x30', 'brand' => 'Local Mill', 'gsm' => 260, 'size_label' => '20x30', 'unit' => 'ream', 'sku' => 'ART-260-2030-011', 'description' => 'Compact sheet size for smaller press jobs and cutting requirements.'],
            ['category' => 'Art Card', 'name' => 'Art Card 300 GSM 20x30', 'brand' => 'Local Mill', 'gsm' => 300, 'size_label' => '20x30', 'unit' => 'ream', 'sku' => 'ART-300-2030-012', 'description' => 'Heavy art card for premium cards, invitation covers, and packaging samples.'],
            ['category' => 'Art Card', 'name' => 'Glossy Art Card 250 GSM 23x36', 'brand' => 'Local Mill', 'gsm' => 250, 'size_label' => '23x36', 'unit' => 'ream', 'sku' => 'ART-250-GLS-013', 'description' => 'Gloss coated art card for colorful advertising and product label jobs.'],
            ['category' => 'Art Card', 'name' => 'Matte Art Card 300 GSM 23x36', 'brand' => 'Local Mill', 'gsm' => 300, 'size_label' => '23x36', 'unit' => 'ream', 'sku' => 'ART-300-MAT-014', 'description' => 'Matte coated art card for refined packaging, covers, and presentation work.'],
            ['category' => 'Duplex Board', 'name' => 'Duplex Board Grey Back 250 GSM 23x36', 'brand' => 'Local Mill', 'gsm' => 250, 'size_label' => '23x36', 'unit' => 'kg', 'sku' => 'DUP-250-GB-015', 'description' => 'Grey back duplex board for cartons, sleeves, and light packaging.'],
            ['category' => 'Duplex Board', 'name' => 'Duplex Board Grey Back 300 GSM 23x36', 'brand' => 'Local Mill', 'gsm' => 300, 'size_label' => '23x36', 'unit' => 'kg', 'sku' => 'DUP-300-GB-016', 'description' => 'Standard grey back duplex board used by local packaging printers.'],
            ['category' => 'Duplex Board', 'name' => 'Duplex Board Grey Back 350 GSM 23x36', 'brand' => 'Local Mill', 'gsm' => 350, 'size_label' => '23x36', 'unit' => 'kg', 'sku' => 'DUP-350-GB-017', 'description' => 'Heavy grey back duplex for box packaging and rigid printed jobs.'],
            ['category' => 'Duplex Board', 'name' => 'Duplex Board Grey Back 400 GSM 23x36', 'brand' => 'Local Mill', 'gsm' => 400, 'size_label' => '23x36', 'unit' => 'kg', 'sku' => 'DUP-400-GB-018', 'description' => 'Extra heavy duplex board for sturdy packaging and display material.'],
            ['category' => 'Duplex Board', 'name' => 'Duplex Board White Back 300 GSM 23x36', 'brand' => 'Local Mill', 'gsm' => 300, 'size_label' => '23x36', 'unit' => 'kg', 'sku' => 'DUP-300-WB-019', 'description' => 'White back duplex board for cleaner packaging finish and display print.'],
            ['category' => 'Duplex Board', 'name' => 'Duplex Board White Back 350 GSM 23x36', 'brand' => 'Local Mill', 'gsm' => 350, 'size_label' => '23x36', 'unit' => 'kg', 'sku' => 'DUP-350-WB-020', 'description' => 'Heavy white back duplex board for premium packaging requirements.'],
            ['category' => 'Newsprint', 'name' => 'Newsprint 45 GSM 23x36', 'brand' => 'Local Mill', 'gsm' => 45, 'size_label' => '23x36', 'unit' => 'kg', 'sku' => 'NEW-45-2336-021', 'description' => 'Low-cost newsprint for leaflets, forms, wrappers, and rough printing.'],
            ['category' => 'Newsprint', 'name' => 'Newsprint 48 GSM 23x36', 'brand' => 'Local Mill', 'gsm' => 48, 'size_label' => '23x36', 'unit' => 'kg', 'sku' => 'NEW-48-2336-022', 'description' => 'Regular newsprint sheet for newspaper-style and budget print jobs.'],
            ['category' => 'Newsprint', 'name' => 'Newsprint 52 GSM 23x36', 'brand' => 'Local Mill', 'gsm' => 52, 'size_label' => '23x36', 'unit' => 'kg', 'sku' => 'NEW-52-2336-023', 'description' => 'Slightly heavier newsprint for better handling on local machines.'],
            ['category' => 'Newsprint', 'name' => 'Newsprint Roll 45 GSM', 'brand' => 'Local Mill', 'gsm' => 45, 'size_label' => 'Roll', 'unit' => 'roll', 'sku' => 'NEW-45-ROLL-024', 'description' => 'Newsprint roll stock for customers who cut sheets or run roll-fed jobs.'],
            ['category' => 'Sticker Paper', 'name' => 'Glossy Sticker Paper 20x30', 'brand' => 'Local Mill', 'gsm' => null, 'size_label' => '20x30', 'unit' => 'ream', 'sku' => 'STK-GLS-2030-025', 'description' => 'Glossy adhesive sheet for labels, stickers, and packaging marks.'],
            ['category' => 'Sticker Paper', 'name' => 'Matte Sticker Paper 20x30', 'brand' => 'Local Mill', 'gsm' => null, 'size_label' => '20x30', 'unit' => 'ream', 'sku' => 'STK-MAT-2030-026', 'description' => 'Matte adhesive sheet for writable labels and subdued package stickers.'],
            ['category' => 'Sticker Paper', 'name' => 'Chromo Sticker Paper 20x30', 'brand' => 'Local Mill', 'gsm' => null, 'size_label' => '20x30', 'unit' => 'ream', 'sku' => 'STK-CHR-2030-027', 'description' => 'Chromo adhesive paper for high-volume commercial label printing.'],
            ['category' => 'Sticker Paper', 'name' => 'PVC Sticker Roll White', 'brand' => 'Local Mill', 'gsm' => null, 'size_label' => 'Roll', 'unit' => 'roll', 'sku' => 'STK-PVC-ROLL-028', 'description' => 'White PVC sticker roll for durable labels and signage suppliers.'],
            ['category' => 'Board', 'name' => 'Mill Board 32oz 23x36', 'brand' => 'Local Mill', 'gsm' => null, 'size_label' => '23x36', 'unit' => 'bundle', 'sku' => 'BRD-MILL-32OZ-029', 'description' => 'Mill board for binding, backing, and rigid packaging support.'],
            ['category' => 'Board', 'name' => 'Hard Board 40oz 23x36', 'brand' => 'Local Mill', 'gsm' => null, 'size_label' => '23x36', 'unit' => 'bundle', 'sku' => 'BRD-HARD-40OZ-030', 'description' => 'Heavy hard board for book binding, folders, and packaging reinforcement.'],
        ];
    }
}
