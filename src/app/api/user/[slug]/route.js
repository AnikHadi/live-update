import connectToDatabase from "@/lib/mongoose.js";
import User from "@/models/user.model.js";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { slug } = await params;

  await connectToDatabase();
  try {
    const findUser = await User.findById(slug);
    if (!findUser) {
      return NextResponse.json({ error: "Data not found" }, { status: 404 });
    }
    return NextResponse.json(findUser);
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
    const user = await User.findOne({ phone: body.phone }).select(
      "-password -__v "
    );

    if (!user) {
      return NextResponse.json(
        { error: "User doesn't exists", success: false },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Login successfully", user: user, success: true },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save data", success: false },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  const { slug } = await params;
  await connectToDatabase();
  try {
    const findUser = await User.findById(slug);
    if (!findUser) {
      return NextResponse.json(
        { error: "Data not found", success: false },
        { status: 404 }
      );
    }
    const body = await request.json();

    const editedUser = await User.findByIdAndUpdate(
      slug,
      { $set: body },
      { new: true }
    );

    return NextResponse.json(
      { editedComment: editedUser, success: true },
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
    const findUser = await User.findById(slug);
    if (!findUser) {
      return NextResponse.json(
        { error: "Data not found", success: false },
        { status: 404 }
      );
    }
    const data = await User.deleteOne({ _id: slug });

    if (data.deletedCount === 0) {
      return NextResponse.json(
        { error: "Failed to delete data", success: false },
        { status: 500 }
      );
    }
    const joinedDeleteInfo = { ...data, ...findUser._doc };
    return NextResponse.json(
      { data: joinedDeleteInfo, success: true },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data", success: false },
      { status: 500 }
    );
  }
}
