<?php

namespace App\Services;

use App\Models\Staff;
use Illuminate\Support\Facades\DB;

class StaffService
{
    public function getAllStaff()
    {
        return Staff::with(['skills', 'assignments'])->get();
    }

    public function getStaffById($id)
    {
        return Staff::with(['skills', 'assignments'])->findOrFail($id);
    }

    public function createStaff(array $data)
    {
        return DB::transaction(function () use ($data) {
            $staff = Staff::create($data);
            if (isset($data['skills'])) {
                $staff->skills()->sync($data['skills']);
            }
            return $staff;
        });
    }

    public function updateStaff($id, array $data)
    {
        return DB::transaction(function () use ($id, $data) {
            $staff = Staff::findOrFail($id);
            $staff->update($data);
            if (isset($data['skills'])) {
                $staff->skills()->sync($data['skills']);
            }
            return $staff;
        });
    }
}
