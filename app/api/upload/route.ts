import { PutObjectCommand } from "@aws-sdk/client-s3";

import { v4 as uuidv4 } from 'uuid';
import { NextResponse } from "next/server";
import { s3Client } from "@/lib/s3-client";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `${uuidv4()}-${file.name}`;

    const params = {
      Bucket: process.env.LIARA_BUCKET_NAME!,
      Key: fileName,
      Body: buffer,
      ContentType: file.type
    };

    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    const fileUrl = `${process.env.LIARA_ENDPOINT}/${process.env.LIARA_BUCKET_NAME}/${fileName}`;

    return NextResponse.json({ 
      success: true, 
      fileUrl 
    });

  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ 
      error: "Upload failed" 
    }, { status: 500 });
  }
}