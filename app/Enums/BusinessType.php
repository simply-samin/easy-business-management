<?php

namespace App\Enums;

enum BusinessType: string
{
    case SoleProprietorship = 'sole_proprietorship';
    case Partnership = 'partnership';
    case PrivateLimited = 'private_limited';
    case Other = 'other';
}
