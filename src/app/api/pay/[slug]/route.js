import connectToDatabase from "@/lib/mongoose.js";
import PayAmount from "@/models/pay.model.js";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { slug } = await params;

  await connectToDatabase();
  try {
    const findData = await PayAmount.findById(slug);
    if (!findData) {
      return NextResponse.json({ error: "Data not found" }, { status: 404 });
    }
    return NextResponse.json(findData);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  const { slug } = await params;
  await connectToDatabase();
  try {
    const findData = await PayAmount.findById(slug);
    if (!findData) {
      return NextResponse.json(
        { error: "Data not found", success: false },
        { status: 404 }
      );
    }
    const body = await request.json();

    const editedComment = await PayAmount.findByIdAndUpdate(
      slug,
      { $set: body },
      { new: true }
    );

    return NextResponse.json(
      { editedComment: editedComment, success: true },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save data", success: false },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  const { slug } = await params;

  await connectToDatabase();
  try {
    const findData = await PayAmount.findById(slug);
    if (!findData) {
      return NextResponse.json(
        { error: "Data not found", success: false },
        { status: 404 }
      );
    }
    const data = await PayAmount.deleteOne({ _id: slug });

    if (data.deletedCount === 0) {
      return NextResponse.json(
        { error: "Failed to delete data", success: false },
        { status: 500 }
      );
    }
    const joinedDeleteInfo = { ...data, ...findData._doc };
    return NextResponse.json(
      { data: joinedDeleteInfo, success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data", success: false },
      { status: 500 }
    );
  }
}
