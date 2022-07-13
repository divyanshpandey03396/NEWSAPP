const express = require("express");
const router = express.Router();
const NewsItemModel = require("../models/newsItem");

router.post("/addnewsitem", async (request, response) => {
  try {
    const newItem = new NewsItemModel(request.body);
    await newItem.save();

    response.status(200).send("News added successfully");
  } catch (err) {
    response.status(400).send(err);
  }
});

router.get("/getallnewsitems", async (request, response) => {
  try {
    const data = await NewsItemModel.find({});

    response.status(200).json(data);
  } catch (err) {
    response.status(400).send(err);
  }
});

router.post("/getnewsitembyid", async (request, response) => {
  try {
    const data = await NewsItemModel.findOne({ _id: request.body.newsid });

    response.status(200).json(data);
  } catch (err) {
    response.status(400).send(err);
  }
});

router.post("/getnewsitemsbyuserid", async (request, response) => {
  try {
    const data = await NewsItemModel.find({});
    const userPostedNewsItems = data.filter(
      (obj) => obj.postedBy.userid === request.body.userid
    );

    response.status(200).send(userPostedNewsItems);
  } catch (err) {
    response.status(400).send(err);
  }
});

router.post("/editnewsitem", async (request, response) => {
  try {
    await NewsItemModel.findOneAndUpdate(
      { _id: request.body.newsid },
      request.body
    );

    response.status(200).send("News edited successfully");
  } catch (err) {
    response.status(400).send(err);
  }
});

router.post("/deletenewsitem", async (request, response) => {
  try {
    await NewsItemModel.findOneAndDelete({ _id: request.body.newsid });
    response.status(200).send("News deleted successfully");
  } catch (err) {
    response.status(400).send(err);
  }
});

module.exports = router;
