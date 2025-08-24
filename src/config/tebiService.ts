import AWS from "aws-sdk";

// Configure Tebi S3
const s3 = new AWS.S3({
    endpoint: 'https://s3.tebi.io', // replace with your Tebi endpoint
    accessKeyId: process.env.TEBI_KEY,            // from Tebi dashboard
    secretAccessKey: process.env.TEBI_SECRETKEY,        // from Tebi dashboard
    s3ForcePathStyle: true,
});

const BUCKET_NAME = 'your-bucket-name';

export const uploadFileToTebi = async (fileName: string, fileBuffer: Buffer) => {
    const params = {
        Bucket: BUCKET_NAME,
        Key: `${Date.now()}-${fileName}`, // unique name
        Body: fileBuffer,
    };

    try {
        const result = await s3.upload(params).promise();
        return result.Location; // URL of uploaded file
    } catch (err) {
        console.error("Tebi upload error:", err);
        throw err;
    }
};

// services/tebiService.ts
export const deleteFileFromTebi = async (fileUrl: string) => {
    try {
        // Extract Key from URL
        const url = new URL(fileUrl);
        const key = url.pathname.slice(1); // remove leading '/'

        await s3.deleteObject({
            Bucket: BUCKET_NAME,
            Key: key,
        }).promise();

        console.log("Old file deleted from Tebi:", key);
    } catch (err) {
        console.error("Error deleting file from Tebi:", err);
    }
};