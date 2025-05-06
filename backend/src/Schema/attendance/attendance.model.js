const mongoose = require("mongoose");
const {
  batches,
  user,
  attendances,
  boards,
} = require("../../Constants/model.constants");

const ModelSchema = new mongoose.Schema(
  {
    summary: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    day: {
      type: String,
      required: true,
      lowercase: true,
    },
    isPresent: {
      type: Boolean,
      default: false,
    },
    class: {
      type: Number,
      required: true,
    },
    batch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: batches,
      required: true,
    },
    board: {
      type: mongoose.Schema.Types.ObjectId,
      ref: boards,
      required: true,
    },
    googleMeet: {
      meetLink: {
        type: String,
      },
      conferenceId: {
        type: String,
      },
      details: {
        type: mongoose.Schema.Types.Mixed,
        default: {},
      },
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

const attendanceModel = mongoose.model(attendances, ModelSchema);

module.exports = attendanceModel;
