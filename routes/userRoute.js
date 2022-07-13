const express = require("express");
const router = express.Router();
const UserItemModel = require("../models/userModel");

router.post("/register", async (request, response) => {
  try {
    const newItem = new UserItemModel(request.body);
    await newItem.save();
    response.status(200).send("User added successfully");
  } catch (err) {
    response.status(400).send(err);
  }
});

router.post("/login", async (request, response) => {
  try {
    const result = await UserItemModel.findOne({
      email: request.body.email,
      password: request.body.password,
    });
    if (!result) {
      return response.status(404).send("Invalid credentials");
    }
    delete result.password;
    console.log(result);
    response
      .status(200)
      .send({ name: result.name, email: result.email, userid: result._id });
  } catch (err) {
    response.status(400).send(err);
  }
});

module.exports = router;
