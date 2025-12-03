import { NextResponse } from "next/server";
import { writeFile, mkdirSync, existsSync } from "fs";
import path from "path";
import { revalidatePath } from 'next/cache';

// File upload constants
const MAX_FILE_SIZE = 5242880; // 5MB (5 * 1024 * 1024 bytes)
const MIN_FILE_SIZE = 10240;   // 10KB
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

// Helper function to get allowed origin
function getAllowedOrigin(origin) {
  const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://user.landmarkplots.com'
  ];
  return allowedOrigins.includes(origin) ? origin : allowedOrigins[0];
}

// Handle OPTIONS preflight requests
export async function OPTIONS(req) {
  const origin = req.headers.get('origin') || 'http://localhost:5173';
  const allowedOrigin = getAllowedOrigin(origin);
  
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': allowedOrigin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
}

export async function POST(req) {
  const data = await req.formData();
  const files = [];
  let i = 0;

  // Collect all files (supporting both file, file0, file1, ...)
  while (data.get(`file${i}`) != null) {
    files.push(data.get(`file${i}`));
    i++;
  }
  // If only "file" is sent (single/multiple)
  if (files.length === 0 && data.get("file")) {
    const maybeFile = data.get("file");
    if (maybeFile && maybeFile.name) {
      files.push(maybeFile);
    }
  }

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir, { recursive: true });
  }

  const filenames = [];
  const errors = [];
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (!file || !file.name) continue;
    
    // Validate file type
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      errors.push(`File "${file.name}": Invalid file type. Only JPG, PNG, and WEBP are allowed.`);
      continue;
    }
    
    // Validate file size
    const fileSize = file.size;
    if (fileSize < MIN_FILE_SIZE) {
      errors.push(`File "${file.name}": Too small (minimum: ${(MIN_FILE_SIZE / 1024).toFixed(0)}KB, current: ${(fileSize / 1024).toFixed(2)}KB)`);
      continue;
    }
    if (fileSize > MAX_FILE_SIZE) {
      errors.push(`File "${file.name}": Too large (maximum: ${(MAX_FILE_SIZE / 1024 / 1024).toFixed(0)}MB, current: ${(fileSize / 1024 / 1024).toFixed(2)}MB)`);
      continue;
    }
    
    // If validation passes, upload the file
    try {
      const byteData = await file.arrayBuffer();
      const buffer = Buffer.from(byteData);
      const fname = `${Date.now()}_${i}_${file.name.replace(/[^a-zA-Z0-9.\\-_]/g, "_")}`;
      const filePath = path.join(uploadDir, fname);
      await new Promise((resolve, reject) => {
        writeFile(filePath, buffer, (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
      filenames.push(fname);
    } catch (err) {
      errors.push(`File "${file.name}": Upload failed - ${err.message}`);
    }
  }
  
  // If there are errors, return them
  if (errors.length > 0) {
    const origin = req.headers.get('origin') || 'http://localhost:5173';
    const allowedOrigin = getAllowedOrigin(origin);
    return NextResponse.json(
      { 
        success: false, 
        error: errors.length === 1 ? errors[0] : `Multiple errors: ${errors.join('; ')}`,
        errors: errors,
        filenames: filenames // Return successfully uploaded files if any
      },
      { 
        status: 400,
        headers: {
          'Access-Control-Allow-Origin': allowedOrigin,
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      }
    );
  }

  // Get the origin from the request and set appropriate CORS headers
  const origin = req.headers.get('origin') || 'http://localhost:5173';
  const allowedOrigin = getAllowedOrigin(origin);

  // After successful upload
  await revalidatePath('/'); // or the path where images are shown

  // Return response with CORS headers
  return NextResponse.json(
    { success: true, filenames },
    {
      headers: {
        'Access-Control-Allow-Origin': allowedOrigin,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  );
}