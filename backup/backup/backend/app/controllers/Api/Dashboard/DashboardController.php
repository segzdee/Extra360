<?php

namespace App\Controllers\Api\Dashboard;

use App\Controllers\BaseController;

class DashboardController extends BaseController
{
    public function index()
    {
        return $this->response([
            'stats' => [
                'totalUsers' => 0,
                'activeUsers' => 0,
                'totalTransactions' => 0
            ]
        ]);
    }

    public function metrics()
    {
        return $this->response([
            'dailyStats' => [],
            'weeklyStats' => [],
            'monthlyStats' => []
        ]);
    }
}
