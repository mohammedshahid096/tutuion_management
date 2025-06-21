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

    category: {
      type: String,
      enum: ["primary", "warning", "success", "danger", "info"],
      default: "primary",
    },
    type: {
      type: String,
      enum: ["contact_form", "custom", "google_meet_cron"],
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
