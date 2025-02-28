import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import userModel from "../models/userModel.js";
import Replicate from "replicate";

const streamToBase64 = (stream) => {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('error', (err) => reject(err));
    stream.on('end', () => {
      const buffer = Buffer.concat(chunks);
      resolve(buffer.toString('base64'));
    });
  });
};

//controller function to generate result image

const generateImage = async (req, res) => {
  try {
    console.log("Uploaded Files:", req.files); // Debugging

    const { clerkId } = req.body;

    const user = await userModel.findOne({ clerkId });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.creditBalance === 0) {
      return res.json({
        success: false,
        message: "Insufficient credit balance",
        creditBalance: user.creditBalance,
      });
    }

    if (!req.files || !req.files.sourceImage || !req.files.targetImage) {
      return res.json({
        success: false,
        message:
          "Both source and target images are required pls upload both images",
      });
    }

    const sourceImageFile = req.files?.sourceImage[0];
    const targetImageFile = req.files?.targetImage[0];

    // Read files using fs and convert to base64
    const sourceBase64 = fs.readFileSync(sourceImageFile.path).toString('base64');
    const targetBase64 = fs.readFileSync(targetImageFile.path).toString('base64');

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    const input = {
      image: `data:${sourceImageFile.mimetype};base64,${sourceBase64}`,
      image_to_become: `data:${targetImageFile.mimetype};base64,${targetBase64}`,
      number_of_images: 1,
    };

    const response = await replicate.run(
      "fofr/become-image:8d0b076a2aff3904dfcec3253c778e0310a68f78483c4699c7fd800f3051d2b3",
      { input }
    );
    console.log("Replicate Response:", response[0]);

    const imageResponse = await axios.get(response[0], { responseType: 'arraybuffer' });
    
    const resultBase64 = Buffer.from(imageResponse.data,'binary').toString('base64');

    const resultImage = `data:${sourceImageFile.mimetype};base64,${resultBase64}`;

    user.creditBalance -= 1;
    await user.save();

    return res.json({
      success: true,
      resultImage,
      creditBalance: user.creditBalance-1,
    });

  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export { generateImage };
