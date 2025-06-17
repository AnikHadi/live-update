import connectToDatabase from "@/lib/mongoose.js";
import PayAmount from "@/models/pay.model.js";

export async function GET(req) {
  try {
    return Response.json({ message: "Hello World" });
  } catch (error) {
    console.log(error);
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();
    const { name, phone, amount } = await request.json();

    if (!name || !phone || !amount) {
      return new Response(JSON.stringify({ message: "Missing fields" }), {
        status: 400,
      });
    }
    const payAmount = new PayAmount({ name, phone, amount });
    await payAmount.save();

    return Response.json(payAmount, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
