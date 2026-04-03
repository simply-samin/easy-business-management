<?php

namespace App\Enums;

enum OutletType: string
{
    case Shop = 'shop';
    case Office = 'office';
    case Warehouse = 'warehouse';
    case Online = 'online';
}
