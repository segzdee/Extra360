<?php

namespace App\Controllers\Api\Staff;

use App\Controllers\BaseController;
use App\Services\StaffService;
use Illuminate\Http\Request;

class StaffController extends BaseController
{
    protected $staffService;

    public function __construct(StaffService $staffService)
    {
        $this->staffService = $staffService;
    }

    public function index()
    {
        return $this->response($this->staffService->getAllStaff());
    }

    public function show($id)
    {
        return $this->response($this->staffService->getStaffById($id));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:staff',
            'phone' => 'required|string',
            'skills' => 'array'
        ]);

        return $this->response(
            $this->staffService->createStaff($validated),
            'Staff member created successfully'
        );
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'string',
            'email' => 'email|unique:staff,email,'.$id,
            'phone' => 'string',
            'skills' => 'array'
        ]);

        return $this->response(
            $this->staffService->updateStaff($id, $validated),
            'Staff member updated successfully'
        );
    }
}
