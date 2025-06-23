import mongoose from "mongoose";

const guestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    imageUrl: {
      type: String,
      default:
        "https://img.lovepik.com/png/20231125/man-avatar-image-for-profile-child-diverse-guy_693690_wh860.png",
      required: true,
    },
  },
  { timestamps: true }
);

const Guest = mongoose.models.Guest || mongoose.model("Guest", guestSchema);

export default Guest;
