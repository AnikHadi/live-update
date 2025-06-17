"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";

export default function InputData() {
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formdata = event.target;
    const name = formdata.name.value;
    const phone = formdata.phone.value;
    const amount = Number(formdata.amount.value);

    const data = {
      name,
      phone,
      amount,
    };

    const response = await axios.post("/api/pay-amount", data);
    // const res = response.json();

    console.log(response);
    // formdata.reset();
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Input Data</CardTitle>
          <CardDescription>
            Enter your Name,Phone Number and Amount below to this form
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleFormSubmit}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" placeholder="John Doe" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="phone"
                  placeholder="1234567890"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="amount">Amount</Label>
                <Input id="amount" type="number" placeholder="12345" required />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2 mt-4">
            <Button type="submit" className="w-full">
              Submit
            </Button>
            <Button variant="outline" className="w-full">
              Cancel
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
