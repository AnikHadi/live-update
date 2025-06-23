import connectToDatabase from "@/lib/mongoose.js";
import Guest from "@/models/guest.model.js";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();
  try {
    const data = await Guest.find().sort({ createdAt: -1 });
    return NextResponse.json(data);
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
    const newGuest = new Guest(body);
    await newGuest.save();

    return NextResponse.json(
      { message: "Guest saved successfully", data: newGuest, success: true },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: error.errmsg,
        success: false,
      },
      { status: 500 }
    );
  }
}
