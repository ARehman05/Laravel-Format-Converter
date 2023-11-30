<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Intervention\Image\Facades\Image;

class ImageConversionController extends Controller
{
    public function convertImage(Request $request)
    {
        // log::info("request_data" . json_encode($request->all()));
        $request->validate([
            'imageData' => 'required',
            'outputFormat' => 'required|in:webp,jpeg,jpg,gif,png',
            'fileName' => 'required|string',
        ]);

        $imageData = str_replace('data:image/' . $request->input('outputFormat') . ';base64,', '', $request->input('imageData'));
        $imageData = base64_decode($imageData);

        $outputFormat = $request->input('outputFormat');
        $fileName = $request->input('fileName');
        
        $filePath = 'public/converted_images/' . $fileName;
        Storage::put($filePath, $imageData);

        // Log::info('File path: ' . $filePath);
        return response()->json(['message' => 'Image converted successfully.', 'filePath' => asset('storage/converted_images/' . $fileName)]);
    }
}
