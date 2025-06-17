import connectToDatabase from "@/lib/mongoose.js";
export default async function POST(req) {
  await connectToDatabase();
  console.log(req);
  const { name, phone, amount } = await req.json();

  console.log(name, phone, amount);
  // Your logic here, e.g., fetching or saving data
  res.status(200).json({ message: "Connected to MongoDB" });
}
