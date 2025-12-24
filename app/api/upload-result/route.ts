import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const requestId = formData.get('requestId') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    if (!requestId) {
      return NextResponse.json(
        { error: 'No request ID provided' },
        { status: 400 }
      );
    }

    // Create results directory if it doesn't exist
    const resultsDir = join(process.cwd(), 'public', 'results');
    if (!existsSync(resultsDir)) {
      await mkdir(resultsDir, { recursive: true });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const originalName = file.name;
    const extension = originalName.split('.').pop();
    const fileName = `${requestId}-${timestamp}.${extension}`;
    const filePath = join(resultsDir, fileName);

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // Return the public URL
    const fileUrl = `/results/${fileName}`;

    return NextResponse.json({
      success: true,
      fileUrl,
      fileName: originalName,
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}

