import AWS from "aws-sdk";

const s3 = new AWS.S3({
  endpoint: process.env.TEBI_ENDPOINT, // e.g. https://s3.tebi.io
  accessKeyId: process.env.TEBI_ACCESS_KEY,
  secretAccessKey: process.env.TEBI_SECRET_KEY,
  s3ForcePathStyle: true,
  signatureVersion: "v4",
});

export const uploadFileToTebi = async (fileName: string, fileBuffer: Buffer) => {
  const params = {
    Bucket: process.env.TEBI_BUCKET!,  // ✅ bucket name, not endpoint
    Key: `${Date.now()}-${fileName}`,
    Body: fileBuffer,
    ACL: "public-read",
    ContentType: fileName.endsWith(".json") ? "application/json" : "text/html",
  };

  try {
    const result = await s3.upload(params).promise();
    return result.Location;
  } catch (err) {
    console.error("Tebi upload error:", err);
    throw err;
  }
};

export const deleteFileFromTebi = async (fileUrl: string) => {
  try {
    const url = new URL(fileUrl);
    const key = url.pathname.slice(1);

    await s3
      .deleteObject({
        Bucket: process.env.TEBI_BUCKET!,  // ✅ fixed
        Key: key,
      })
      .promise();

    console.log("Old file deleted from Tebi:", key);
  } catch (err) {
    console.error("Error deleting file from Tebi:", err);
  }
};
