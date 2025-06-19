import mongoose from "mongoose";

const payAmountSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const PayAmount =
  mongoose.models.PayAmount || mongoose.model("PayAmount", payAmountSchema);

export default PayAmount;
