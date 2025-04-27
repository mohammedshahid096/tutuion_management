const mongoose = require("mongoose");
const { subjects, user } = require("../../Constants/model.constants");

const ModelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
    },
    description: {
      type: String,
      lowercase: true,
    },
    code: {
      type: String,
      uppercase: true,
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
  { timestamps: true }
);

const subjectModel = mongoose.model(subjects, ModelSchema);

module.exports = subjectModel;
