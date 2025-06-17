"use server";

export async function createPayAmount(formData) {
  const name = formData.get("name");
  const phone = formData.get("phone");
  const amount = formData.get("amount");

  console.log(formData);

  console.log(name, phone, amount);

  // Update data
  // Revalidate cache
}
