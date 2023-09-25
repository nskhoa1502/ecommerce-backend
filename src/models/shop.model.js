"use strict";

const DOCUMENT_NAME = "Shop";
const COLLECTION_NAME = "Shops";

const { Schema, Types, model } = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var shopSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      maxLength: 150,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      // required: true,
    },

    // Check active / inactive
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },

    // Verify shop
    verify: {
      type: Schema.Types.Boolean,
      default: false,
    },

    // Allow shop to access particular resource
    roles: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

//Export the model
module.exports = model(DOCUMENT_NAME, shopSchema);
