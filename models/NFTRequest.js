const mongoose = require("mongoose");

const nftRequestSchema = new mongoose.Schema(
  {
    metadata: {
      propertyName: {
        type: String,
        required: true,
      },
      propertyType: {
        type: String,
        required: true,
      },
      propertyAddress: {
        type: String,
        required: true,
      },
      propertyLocation: {
        type: String,
        required: true,
      },
      propertyOwner: {
        type: String,
        required: true,
      },
      propertyStatus: {
        type: String,
        required: true,
      },
      isApproved: {
        type: Boolean,
        required: true,
        default: false,
      },
      price: {
        type: Number,
        required: true,
      },
      hash: {
        type: String,
        required: true
      },
      images: [
        {
          type: String,
        },
      ],
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "signed"],
      default: "pending",
    },
    assignedAgent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agent",
    },
    token: {
      tokenId:{
        type:Object,
        default: "",
      },
      tokenAddress:{
        type:String,
        default: "",
      },
      tokenURI:{
        type:String,
        default: "",
      }
    },
    call: {
      callLink: {
        type: String,
        default: "",
      },
      callTime: {
        type: String,
        default: "",
      },
      callDate: {
        type: String,
        default: "",
      },
    },
  },
  { timestamps: true }
);

const NFTRequest = mongoose.model("NFTRequest", nftRequestSchema);

module.exports = NFTRequest;
