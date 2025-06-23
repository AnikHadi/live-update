"use server";

export async function imageUpload(file) {
  try {
    const imageData = new FormData();
    imageData.append("file", file);
    imageData.append("upload_preset", "live-update");
    imageData.append("cloud_name", "dwu7lrdhx");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dwu7lrdhx/image/upload",
      {
        method: "POST",
        body: imageData,
      }
    );
    const data = await res.json();
    return data.url;
  } catch (error) {
    return error;
  }
}
export async function createPayAmount(formData) {
  const name = formData.get("name");
  const phone = formData.get("phone");
  const amount = formData.get("amount");

  console.log(formData);

  console.log(name, phone, amount);

  // Update data
  // Revalidate cache
}

export const createGuest = async (formData) => {
  const name = formData.get("name");
  const phone = formData.get("phone");
  const imageUrl = formData.get("imageUrl");

  const res = await fetch("http://localhost:3000/api/guest", {
    method: "POST",
    body: JSON.stringify({ name, phone, imageUrl }),
  });
  return await res.json();
};

export const getGuests = async () => {
  const res = await fetch("http://localhost:3000/api/guest");
  return await res.json();
};

export const updateGuest = async (id) => {
  console.log(id);
};

export const deleteGuest = async (id) => {
  const res = await fetch(`http://localhost:3000/api/guest/${id}`, {
    method: "DELETE",
  });
  return await res.json();
};
