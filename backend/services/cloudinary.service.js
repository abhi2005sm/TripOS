import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload image to Cloudinary
 * @param {string} filePath - Path to local file
 * @param {string} folder - Destination folder
 */
export const uploadImage = async (filePath, folder = 'tripos/avatars') => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: folder,
            use_filename: true,
            unique_filename: true,
        });
        return {
            url: result.secure_url,
            public_id: result.public_id,
        };
    } catch (error) {
        console.error('Cloudinary Error:', error);
        throw new Error('Failed to upload image');
    }
};

/**
 * Delete image from Cloudinary
 */
export const deleteImage = async (publicId) => {
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.error('Cloudinary Delete Error:', error);
    }
};
