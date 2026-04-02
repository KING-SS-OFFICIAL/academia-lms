import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinary(
  file: Buffer | string,
  folder: string = "academia"
): Promise<{ url: string; publicId: string }> {
  let uploadResult;

  if (Buffer.isBuffer(file)) {
    const base64 = file.toString("base64");
    const dataUri = `data:application/octet-stream;base64,${base64}`;
    uploadResult = await cloudinary.uploader.upload(dataUri, { folder });
  } else {
    uploadResult = await cloudinary.uploader.upload(file, { folder });
  }

  return {
    url: uploadResult.secure_url,
    publicId: uploadResult.public_id,
  };
}

export { cloudinary };
