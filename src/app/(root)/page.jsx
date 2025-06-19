"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState("connecting...");

  const fetchData = async () => {
    try {
      const response = await axios.get("/api");
      if (response?.statusText === "OK") {
        const result = response.data;
        setData(result);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const ws = new WebSocket(`${protocol}//${window.location.host}/api/ws`);

    fetchData();

    ws.onopen = () => {
      setConnectionStatus("connected");
    };

    ws.onclose = () => {
      setConnectionStatus("disconnected");
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "NEW_DATA") {
        setData((prevData) => [message.data, ...prevData]);
      }
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

  const totalAmount = data.reduce((total, item) => total + item.amount, 0);
  return (
    <div className="flex min-h-screen gap-5 items-center justify-center">
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
              {data
                ?.sort((a, b) => b.amount - a.amount)
                ?.slice(0, 10)
                .map((item, index) => (
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
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Connection Status</CardTitle>
          <CardDescription
            className={`px-6 py-3 text-sm font-medium rounded-t-xl ${
              connectionStatus === "connected"
                ? "bg-green-50 text-green-700 border-b border-green-100 "
                : connectionStatus === "disconnected"
                ? "bg-red-50 text-red-700 border-b border-red-100 "
                : "bg-yellow-50 text-yellow-700 border-b border-yellow-100 "
            }`}
          >
            {connectionStatus}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h1>Total Investment : {data.length} </h1>
          <h1>Total Amount :</h1>
          <div className="flex w-full">
            {totalAmount
              ?.toString()
              ?.split("")
              ?.map((item, index) => (
                <span className="w-full border text-center text-2xl">
                  {item}
                </span>
              ))}
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2 mt-4"></CardFooter>
      </Card>
    </div>
  );
}
