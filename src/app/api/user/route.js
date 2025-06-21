import connectToDatabase from "@/lib/mongoose.js";
import User from "@/models/user.model.js";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();
  try {
    const data = await User.find().sort({ createdAt: -1 });
    const total = await User.countDocuments();
    return NextResponse.json({ totalUser: total, data });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  await connectToDatabase();
  try {
    const body = await request.json();
    const findUser = await User.findOne({ phone: body.phone });
    if (findUser) {
      return NextResponse.json(
        { error: "User already exists", success: false },
        { status: 400 }
      );
    }
    const newUser = new User(body);
    await newUser.save();

    return NextResponse.json(
      { message: "User saved successfully", data: newUser, success: true },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save data", success: false },
      { status: 500 }
    );
  }
}
