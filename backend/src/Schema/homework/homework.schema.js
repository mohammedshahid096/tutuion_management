const mongoose = require("mongoose");
const {
  user,
  batches,
  homeworks,
  enrollmentProgress,
} = require("../../Constants/model.constants");

const ModelSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    deadline: {
      type: Date,
      required: true,
    },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: user,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: user,
    },
    class: {
      type: String,
      required: true,
    },
    batch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: batches,
      required: true,
    },
    enrollment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: enrollmentProgress,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: user,
      required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: user,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const homeworkModel = mongoose.model(homeworks, ModelSchema);

module.exports = homeworkModel;
