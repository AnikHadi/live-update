import connectToDatabase from "@/lib/mongoose.js";
import PayAmount from "@/models/pay.model.js";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();
  try {
    const data = await PayAmount.find().sort({ createdAt: -1 });
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
    const newData = new PayAmount(body);
    await newData.save();

    return NextResponse.json(
      { message: "Data saved successfully", data: newData, success: true },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save data", success: false },
      { status: 500 }
    );
  }
}
