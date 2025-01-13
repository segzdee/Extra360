<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Services\StaffService;
use App\Models\Staff;
use Illuminate\Foundation\Testing\RefreshDatabase;

class StaffServiceTest extends TestCase
{
    use RefreshDatabase;

    private $staffService;

    protected function setUp(): void
    {
        parent::setUp();
        $this->staffService = new StaffService();
    }

    public function test_can_create_staff()
    {
        $staffData = [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'phone' => '1234567890',
            'skills' => [1, 2, 3]
        ];

        $staff = $this->staffService->createStaff($staffData);

        $this->assertInstanceOf(Staff::class, $staff);
        $this->assertEquals($staffData['name'], $staff->name);
        $this->assertEquals($staffData['email'], $staff->email);
    }

    public function test_can_update_staff()
    {
        // Test implementation
    }

    public function test_can_delete_staff()
    {
        // Test implementation
    }
}
