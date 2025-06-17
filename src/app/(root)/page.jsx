import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const data = [
  { name: "Regular", phone: "1799779933", amount: 10 },
  { name: "Regular", phone: "17991464933", amount: 100 },
  { name: "Regular", phone: "17997546933", amount: 105 },
  { name: "Regular", phone: "179977233", amount: 103 },
  { name: "Regular", phone: "179977924843", amount: 170 },
  { name: "Regular", phone: "17995473", amount: 130 },
  { name: "Regular", phone: "179977656433", amount: 108 },
];
export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center text-2xl">All data</CardTitle>
          <CardDescription>
            Enter your Name,Phone Number and Amount below to this form
          </CardDescription>
        </CardHeader>
        <CardContent>
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody className="w-full ">
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.phone}</td>
                  <td>{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
        <CardFooter className="flex-col gap-2 mt-4"></CardFooter>
      </Card>
    </div>
  );
}
