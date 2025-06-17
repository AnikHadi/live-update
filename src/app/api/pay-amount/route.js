import connectToDatabase from "@/lib/mongoose.js";
import PayAmount from "@/models/pay.model.js";

export async function GET(req) {
  try {
    // await connectToDatabase();
    // const { name, phone, amount } = req;
    // const payAmount = new PayAmount({ name, phone, amount });
    // await payAmount.save();
    return Response.json({ message: "Hello World" });
  } catch (error) {
    console.log(error);
  }
}

export async function POST(req) {
  try {
    await connectToDatabase();
    // console.log(req);
    const { name, phone, amount } = await req.json();
    console.log(name, phone, amount);
    const payAmount = new PayAmount({ name, phone, amount });
    await payAmount.save();
    return Response.json(payAmount, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}

// export async function POST(request) {
//   // await connectToDatabase();
//   const body = await request.json();

//   console.log(body);
//   const { name, phone, amount } = body;

//   if (!name || !phone || !amount) {
//     return new Response(JSON.stringify({ message: "Missing fields" }), {
//       status: 400,
//     });
//   }

//   return Response(JSON.stringify({ message: "Data received", data: body }), {
//     status: 200,
//     headers: { "Content-Type": "application/json" },
//   });
// }
