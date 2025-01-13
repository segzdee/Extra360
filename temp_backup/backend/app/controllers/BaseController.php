<?php

namespace App\Controllers;

class BaseController
{
    protected function response($data = null, $message = 'Success', $status = 200)
    {
        return response()->json([
            'status' => $status >= 200 && $status < 300,
            'message' => $message,
            'data' => $data
        ], $status);
    }

    protected function error($message = 'Error', $status = 400)
    {
        return $this->response(null, $message, $status);
    }
}
