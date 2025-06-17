import { NextResponse } from "next/server";
import connectToDatabase from "../../../lib/mongoose.js";
import PayAmount from "../../../models/payAmount.model.js";

export const postPayData = async (req) => {
  try {
    await connectToDatabase();
    const { name, phone, amount } = await req.json();
    const payAmount = new PayAmount({ name, phone, amount });
    await payAmount.save();
    return NextResponse.json(payAmount, { status: 200 });
  } catch (error) {
    console.log(error);
  }
};
