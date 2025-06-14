const mongoose = require("mongoose");
const { notifications, user } = require("../../Constants/model.constants");

const ModelSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
      trim: true,
    },

    url: {
      type: String,
      default: null,
    },

    type: {
      type: String,
      enum: ["contact_form", "custom"],
      default: "custom",
    },

    recipientType: {
      type: String,
      enum: ["admin", "student", "both"],
      required: true,
    },

    recipientUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: user,
      //   default: null
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const notificationModel = mongoose.model(notifications, ModelSchema);

module.exports = notificationModel;
