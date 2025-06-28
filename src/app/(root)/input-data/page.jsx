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
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function InputData() {
  const [socket, setSocket] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState("connecting...");
  const [userData, setUserData] = useState([]);

  // Socket Connection
  useEffect(() => {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const ws = new WebSocket(`${protocol}//${window.location.host}/api/ws`);

    ws.onopen = () => {
      setConnectionStatus("connected");
      setSocket(ws);
    };

    ws.onclose = () => {
      setConnectionStatus("disconnected");
    };

    const pingInterval = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(`{"event": "ping"}`);
      }
    }, 29000);

    return () => {
      clearInterval(pingInterval);
      if (ws) ws.close();
    };
  }, []);

  // Get Guest Data
  useEffect(() => {
    const fetchGuestData = async () => {
      try {
        const response = await axios.get("/api/guest");
        if (response?.statusText === "OK") {
          const result = response.data;
          setUserData(result);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchGuestData();
  }, []);

  console.log(userData);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formdata = event.target;
    const name = formdata.name.value;
    const phone = formdata.phone.value;
    const amount = Number(formdata.amount.value);

    if (!name || !phone || !amount) {
      return alert("Please filles all information!");
    }

    const data = {
      name,
      phone,
      amount,
    };

    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: "NEW_DATA", data }));
      const response = await axios.post("/api/pay", data);

      if (response.status === 201) {
        formdata.reset();
        toast.success("Data saved successfully!");
      }
    }
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
                <Input
                  id="name"
                  list="names"
                  type="text"
                  placeholder="John Doe"
                  required
                />
                <datalist id="names">
                  {userData?.map((guest) => (
                    <option key={guest._id} value={guest.name} />
                  ))}
                </datalist>
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
