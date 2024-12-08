import supabase, { supabaseUrl } from "./supabase";

export default async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // Insert the cabin details (excluding the file content for now)
  // Create/Edit
  let query = supabase.from("cabins");
  //  A)Create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  // B)Edit
  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();
  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  // Upload the image file to the bucket using only the file name or folder/file path
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image); // Only pass the file name here

  // If there’s an error in the file upload, delete the cabin entry
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data[0].id); // Use `data[0].id`
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}
export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("cabin could not be delted");
  }
  return data;
}
