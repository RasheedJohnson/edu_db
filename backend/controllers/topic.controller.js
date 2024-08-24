import mongoose from "mongoose";
import Topic from "../models/topic.model.js";

export const getTopics = async (req, res) => {
  try {
    const topics = await Topic.find({});
    res.status(200).json({ success: true, data: topics });
  } catch (error) {
    console.log("Error in fetching topics:", error.message);
    res.status(200).json({ success: false, message: "Server Error" });
  }
};

export const createTopic = async (req, res) => {
  const topic = req.body;

  if (!topic.term || !topic.definition || !topic.book || !topic.chapter) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newTopic = new Topic(topic);

  try {
    await newTopic.save();
    res.status(201).json({ success: true, data: newTopic });
  } catch (error) {
    console.error("Error in creating product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateTopic = async (req, res) => {
  const { id } = req.params;

  const topic = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Topic Id" });
  }

  try {
    const updatedTopic = await Topic.findByIdAndUpdate(id, topic, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedTopic });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteTopic = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Topic Id" });
  }

  try {
    await Topic.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Topic deleted" });
  } catch (error) {
    console.log("Error in deleteing topic");
    res.status(404).json({ success: false, message: "Topic not found" });
  }
};
