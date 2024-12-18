import { S3Client } from "@aws-sdk/client-s3";

export const s3Client = new S3Client({
  endpoint: process.env.LIARA_ENDPOINT,
  region: "default",
  credentials: {
    accessKeyId: process.env.LIARA_ACCESS_KEY!,
    secretAccessKey: process.env.LIARA_SECRET_KEY!
  }
});