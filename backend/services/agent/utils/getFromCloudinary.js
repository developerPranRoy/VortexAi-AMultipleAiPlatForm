import { cloudinary } from "../config/cloudinary.js";

/**
 * Retrieves asset details from Cloudinary by public ID
 * @param {string} publicId - The public ID of the Cloudinary resource
 * @param {"image"|"raw"|"video"} resourceType - The type of the resource
 * @returns {Promise<object>} The Cloudinary resource details including secure_url
 */
export const getFromCloudinary = async (publicId, resourceType = "image") => {
    if (!publicId) {
        throw new Error("Public ID is required to fetch resource from Cloudinary.");
    }

    try {
        const result = await cloudinary.api.resource(publicId, {
            resource_type: resourceType,
        });

        return result;
    } catch (error) {
        throw new Error(`Failed to fetch from Cloudinary: ${error.message}`);
    }
};
