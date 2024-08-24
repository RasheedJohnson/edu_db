import express from "express";

import {
  createTopic,
  deleteTopic,
  getTopics,
  updateTopic,
} from "../controllers/topic.controller.js";

const router = express.Router();

router.get("/", getTopics);
router.post("/", createTopic);
router.put("/:id", updateTopic);
router.delete("/:id", deleteTopic);

export default router;
