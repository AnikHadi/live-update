"use client";
import { imageUpload } from "@/lib/actions";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function InputGuestData() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formdata = event.target;
    const name = formdata.name.value;
    const phone = formdata.phone.value;
    const imageFiles = formdata.imageUrl.files[0];

    if (!name || !phone) {
      return alert("Please filles all information!");
    }

    try {
      let imageUploadUrl;

      if (!imageUploadUrl) {
        imageUploadUrl = await imageUpload(imageFiles);
      }
      const data = {
        name,
        phone,
        imageUrl: imageUploadUrl,
      };

      const response = await axios.post("/api/guest", data);
      if (response.status === 201) {
        formdata.reset();
        formdata.imageUrl.value = "";
        setSelectedFile(null);
        toast.success("Data saved successfully!");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex  justify-center items-center  flex-col gap-4">
      <h1 className="text-2xl font-bold">Input Guest Data</h1>
      <form onSubmit={handleFormSubmit}>
        <Card className="">
          <CardHeader>
            <CardTitle>Guest Data</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="grid min-w-sm w-full items-center gap-1.5">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Full Name"
                type="text"
                className="w-full"
              />
            </div>
            <div className="grid min-w-sm w-full items-center gap-1.5">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                placeholder="Phone Number"
                type="tel"
                className="w-full"
              />
            </div>
            <div className="flex min-w-sm w-full  gap-4">
              <div className="w-[50%]">
                <Label htmlFor="imageUrl">Upload Image</Label>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  placeholder="Phone Number"
                  type="file"
                  className="w-full"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                />
              </div>
              <div>
                {selectedFile && (
                  <img
                    src={URL.createObjectURL(selectedFile)}
                    alt={selectedFile.name}
                    className="w-[80px] h-[80px] object-cover"
                  />
                )}
              </div>
            </div>
            <Button
              disabled={loading}
              type="submit"
              className={loading ? "cursor-not-allowed" : "cursor-pointer"}
            >
              {loading ? (
                <span className="flex items-center">
                  <span className="animate-spin p-2 mr-2 border-2 border-current border-r-transparent rounded-full" />
                  <span>Loading...</span>
                </span>
              ) : (
                "Submit"
              )}
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
