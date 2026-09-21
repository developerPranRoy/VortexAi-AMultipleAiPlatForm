import { cloudinary } from "../config/cloudinary.js";

/**
 * Uploads a file buffer to Cloudinary
 * @param {Buffer} buffer - The file buffer to upload
 * @param {"image"|"raw"|"auto"} resourceType - Cloudinary resource type
 * @param {string} folder - Cloudinary folder to store the file in
 * @returns {Promise<{ secure_url: string, public_id: string }>}
 */
export const uploadToCloudinary = (buffer, resourceType = "auto", folder = "vortexai") => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                resource_type: resourceType,
                folder,
            },
            (error, result) => {
                if (error) return reject(error);

                if (!result?.secure_url || !result?.public_id) {
                    return reject(new Error("Cloudinary upload failed: missing result data"));
                }

                resolve({
                    secure_url: result.secure_url,
                    public_id: result.public_id,
                    resource_type: result.resource_type,
                    format: result.format,
                });
            }
        );

        uploadStream.end(buffer);
    });
};
