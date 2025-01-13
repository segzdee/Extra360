<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Staff;
use Illuminate\Foundation\Testing\RefreshDatabase;

class StaffApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_get_staff_list()
    {
        // Create test staff
        Staff::factory()->count(3)->create();

        $response = $this->getJson('/api/staff');

        $response->assertStatus(200)
                ->assertJsonStructure([
                    'data' => [
                        '*' => [
                            'id',
                            'name',
                            'email',
                            'phone',
                            'status'
                        ]
                    ]
                ]);
    }

    public function test_can_create_staff_member()
    {
        $staffData = [
            'name' => 'Jane Doe',
            'email' => 'jane@example.com',
            'phone' => '1234567890',
            'skills' => [1, 2]
        ];

        $response = $this->postJson('/api/staff', $staffData);

        $response->assertStatus(201)
                ->assertJson([
                    'data' => [
                        'name' => $staffData['name'],
                        'email' => $staffData['email']
                    ]
                ]);
    }
}
