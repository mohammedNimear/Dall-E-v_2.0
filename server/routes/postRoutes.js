import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import Post from "./../mongodb/models/post.js";

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// GET ALL POST
router.route("/").get(async (req, res) => {
    try {
        const posts = await Post.find({})

        res.statusCode(200).json({seccess: true, data: posts})
    } catch (err) {
        res.statusCode(500).json({seccess: false, message: err.message})
    }
});

//  CREATE A POST
router.route("/").post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo);

    const newPost = new Post.create({
      name,
      prompt,
      photo: photoUrl.url,
    });

    res.status(201).json({ seccess: true, data: newPost });
  } catch (err) {
    res.status(500).json({ seccess: false, Message: err.message });
  }
});

export default router;
