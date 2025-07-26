import { NextResponse } from "next/server";
import { writeFile, mkdirSync, existsSync } from "fs";
import path from "path";

// Handle OPTIONS preflight requests
export async function OPTIONS(req) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': 'https://user.landmarkplots.com',
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

  // Return response with CORS headers
  return NextResponse.json(
    { success: true, filenames },
    {
      headers: {
        'Access-Control-Allow-Origin': 'https://user.landmarkplots.com',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  );
}