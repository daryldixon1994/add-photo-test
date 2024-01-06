const express = require("express");
const route = express.Router();
const User = require("../../models/User");
const upload = require("../../middlewares/upload");
const audioMidd = require("../../middlewares/audioMidd");
route.post("/register", async (req, res) => {
  try {
    let { userName, email, password } = req.body;
    const newUser = await new User({
      userName,
      email,
      password,
    });
    await newUser.save();
    res
      .status(200)
      .json({ status: true, message: "User was created successfully" });
  } catch (error) {
    if (error) throw error;
    res.status(400).json({ status: false, error });
  }
});

route.put("/add-photo/:id", upload.single("photo"), async (req, res) => {
  try {
    let { id } = req.params;
    let userImg = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;
    let newUser = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          userImg,
        },
      },
      { new: true }
    );
    res.status(200).json({ status: true, data: newUser });
  } catch (error) {
    if (error) throw error;
    res.status(400).json({ status: false, error });
  }
});
route.post("/add-audio/:id", audioMidd.single("file"), async (req, res) => {
  try {
    let { id } = req.params;
    let audio = `${req.protocol}://${req.get("host")}/sounds/${
      req.file.filename
    }`;
    let newUser = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          audio,
        },
      },
      { new: true }
    );
    res.status(200).json({ status: true, data: newUser });
  } catch (error) {
    if (error) throw error;
    res.status(400).json({ status: false, error });
  }
});

route.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let user = await User.findById(id).select("userName userImg");
    res.status(200).json({ status: true, data: user });
  } catch (error) {
    if (error) throw error;
    res.status(400).json({ status: false, error });
  }
});

module.exports = route;
