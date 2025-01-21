import Hackathon from "../models/Hackathon.js";
import axios from "axios";
import Image from "../models/Image.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { error } from "console";

// Uploading image here for the event
export const uploadEventImages = async (req, res) => {
  console.log(req.files);
  if (!req.files) {
    res.status(400).send("no file uploaded");
    return;
  }
  console.log(req.files);
  for (const file of req.files) {
    const imagePath = file.path;
    try {
      const image = new Image({
        imagePath: imagePath,
      });
      await image.save();
      console.log("image uploaded");
    } catch (error) {
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.log(
            "failed to delete image from server, which image data failed to upload on mongoDB"
          );
        }
        console.log(
          "image deleted from server due to image data failed to upload on mongo db"
        );
      });
      console.log(error.message);
      if (req.files.indexOf(file) == req.files.length - 1) {
        return res.status(400).send("Image Upload Failed!");
      }
    }
    res.status(200).send("image uploaded");
  }
};

//Sending req to ml module
export const getFaceDetails = async (req, res) => {
  const photo = req.file;

  try {
    // const formData = new FormData();
    //     formData.append('image', photo.buffer);

    // console.log(formData);

    // Make the POST request to the face recognition module
    const request = {
      method: "POST",
      url: "http://localhost:5000/detect",
      body: {
        image: photo,
      },
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const response = await axios(request);

    // Handle response from the face recognition module
    res.status(200).json(response.data);
  } catch (error) {
    console.error(
      "Error sending image to face recognition module:",
      error.message
    );
    res.status(500).send("Error processing the image");
  }
};

// Event Card Image
export const getCardImage = async (req, res) => {
  const { path } = req.body;
  const imageUrl = `${req.protocol}://${req.get("host")}/${path}`;
  res.send({ url: imageUrl });
};

// Fetch all Events
export const getEvents = async (req, res) => {
  try {
    let events = await Hackathon.find();
    res.status(200).json(events);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", details: error.message });
  }
};

// Create a new Hackathon
export const create = async (req, res) => {
  try {
    const { title, description, date, teams } = req.body;

    console.log(req.file);

    if (!req.file) {
      res.status(400).send("no file uploaded");
      return;
    }
    const imagePath = req.file.path;

    if (!title || !date) {
      return res.status(400).json({ message: "Title and date are required." });
    }

    const newHackathon = new Hackathon({
      title,
      description,
      date,
      teams,
      image: imagePath,
    });

    await newHackathon.save();
    res
      .status(201)
      .json({
        message: "Hackathon created successfully",
        hackathon: newHackathon,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", details: error.message });
  }
};
