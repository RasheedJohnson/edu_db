import mongoose from "mongoose";

const topicSchema = new mongoose.Schema(
  {
    term: {
      type: String,
      required: true,
    },
    definition: {
      type: String,
      required: true,
    },
    book: {
      type: String,
      required: true,
    },
    chapter: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

const Topic = mongoose.model("Topic", topicSchema);

export default Topic;
