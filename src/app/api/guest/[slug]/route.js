import connectToDatabase from "@/lib/mongoose.js";
import Guest from "@/models/guest.model.js";
import { NextResponse } from "next/server";
import sha1 from "sha1";

export async function GET(request, { params }) {
  const { slug } = await params;

  await connectToDatabase();
  try {
    const findGuest = await Guest.findById(slug);
    if (!findGuest) {
      return NextResponse.json({ error: "Guest not found" }, { status: 404 });
    }
    return NextResponse.json(findGuest);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch Guest" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  const { slug } = await params;
  await connectToDatabase();
  try {
    const findGuest = await Guest.findById(slug);
    if (!findGuest) {
      return NextResponse.json(
        { error: "Guest not found", success: false },
        { status: 404 }
      );
    }
    const body = await request.json();

    const editedGuest = await Guest.findByIdAndUpdate(
      slug,
      { $set: body },
      { new: true }
    );

    return NextResponse.json(
      { editedGuest: editedGuest, success: true },
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
    const findGuest = await Guest.findById(slug);
    if (!findGuest) {
      return NextResponse.json(
        { error: "Data not found", success: false },
        { status: 404 }
      );
    }

    const imageID = findGuest.imageUrl.split("/").at(-1).split(".")[0];

    const timestamp = new Date().getTime();
    const string = `public_id=${imageID}&timestamp=${timestamp}${process.env.CLOUDINARY_API_SECRET}`;
    const signature = sha1(string);

    const formData = new FormData();
    formData.append("public_id", imageID);
    formData.append("signature", signature);
    formData.append("api_key", process.env.CLOUDINARY_API_KEY);
    formData.append("timestamp", timestamp);

    const deleteImage = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/destroy`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (deleteImage.ok) {
      const data = await Guest.deleteOne({ _id: slug });

      if (data.deletedCount === 0) {
        return NextResponse.json(
          { error: "Failed to delete data", success: false },
          { status: 500 }
        );
      }
      const joinedDeleteInfo = { ...data, ...findGuest._doc };
      return NextResponse.json(
        { data: joinedDeleteInfo, success: true },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        error: error,
        message: "Failed to Delete guest!",
        success: false,
      },
      { status: 500 }
    );
  }
}
