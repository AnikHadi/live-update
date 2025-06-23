import { ScrollArea } from "@/components/ui/scroll-area";
import { getGuests } from "@/lib/actions";
import Image from "next/image";
import React from "react";
import GuestDeleteBtn from "./Dashboard/GuestDeleteBtn";
import GuestEditBtn from "./Dashboard/GuestEditBtn";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

// const guests = GuestMockData();

export default async function GuestLists() {
  const guests = await getGuests();
  return (
    <div className=" flex justify-center items-center  flex-col gap-4">
      <h1 className="text-2xl font-bold">Guest Lists</h1>
      <Card className="">
        <CardHeader>
          <CardTitle>Guest Data</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <ScrollArea className="max-h-[500px] min-w-[500px] max-w-[800px] rounded-md border">
            <div className="p-4">
              <h4 className="mb-4 text-sm leading-none font-medium">Guest</h4>
              <table className="w-full">
                <thead>
                  <tr className="border-b-1 border-slate-200">
                    <th>Image</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {guests?.map((guest) => (
                    <React.Fragment key={guest._id}>
                      <tr className="border-b-1 border-slate-200">
                        <td>
                          <Image
                            src={guest.imageUrl}
                            alt={guest.name}
                            width={100}
                            height={100}
                            className="w-24 h-16 object-cover"
                          />
                        </td>
                        <td>{guest.name}</td>
                        <td>{guest.phone}</td>
                        <td className="flex gap-2 items-center mt-4">
                          <GuestEditBtn guestID={guest._id} />
                          <GuestDeleteBtn guestID={guest._id} />
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
