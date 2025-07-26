import { NextResponse } from "next/server";
import { writeFile, mkdirSync, existsSync } from "fs";
import path from "path";

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
  for (const file of files) {
    if (!file || !file.name) continue;
    const byteData = await file.arrayBuffer();
    const buffer = Buffer.from(byteData);
    const fname = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.\\-_]/g, "_")}`;
    const filePath = path.join(uploadDir, fname);
    await new Promise((resolve, reject) => {
      writeFile(filePath, buffer, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
    filenames.push(fname);
  }

  // Get the origin from the request and set appropriate CORS headers
  const origin = req.headers.get('origin') || 'http://localhost:5173';
  const allowedOrigin = getAllowedOrigin(origin);

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