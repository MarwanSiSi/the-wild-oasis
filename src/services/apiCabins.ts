import { PostgrestError } from "@supabase/supabase-js";
import supabase, { supabaseUrl } from "./supabase";
import { FieldValues } from "react-hook-form";

export async function getCabins() {
  try {
    const { data, error } = await supabase.from("cabins").select("*");
    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    if (error instanceof PostgrestError) {
      // Handle Supabase-specific errors
      console.error("Error fetching cabins", error.code, error.message);
    } else if (error instanceof Error) {
      // Handle generic errors (e.g., network errors)
      console.error("An unexpected error occurred:", error.message);
    }
    // Re-throw the error to propagate it further
    throw error;
  }
}

export async function deleteCabin(id: number) {
  try {
    const { data, error } = await supabase.from("cabins").delete().eq("id", id);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    if (error instanceof PostgrestError) {
      // Handle Supabase-specific errors
      console.error("Error deleting cabin", error.code, error.message);
    } else if (error instanceof Error) {
      // Handle generic errors (e.g., network errors)
      console.error("An unexpected error occurred:", error.message);
    }
    // Re-throw the error to propagate it further
    throw error;
  }
}

export async function createEditFunction(newCabin: FieldValues, id?: number) {
  const hasImagePath = newCabin?.image?.startsWith?.(supabaseUrl) ?? false;

  const imgName = `${Math.random()}-${newCabin?.image?.name}`.replaceAll(
    "/",
    ""
  );
  const imgPath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins/${imgName}`;

  let cabinData;
  try {
    // 1. Create/Update cabin
    if (!id) {
      console.log("Creating new cabin:", newCabin);

      const { data, error: cabinError } = await supabase
        .from("cabins")
        .insert([{ ...newCabin.data, image: imgPath }])
        .select()
        .single();

      if (cabinError) {
        throw new Error(`Cabin Error: ${cabinError.message}`);
      }

      cabinData = data;
    } else {
      const { data, error } = await supabase
        .from("cabins")
        .update({ ...newCabin, image: imgPath })
        .eq("id", id)
        .select();

      if (error) {
        throw new Error(`Failed to update cabin: ${error.message}`);
      }

      cabinData = data;
    }

    console.log("Cabin data:", cabinData);

    // 2. Upload image if it's a new image
    if (!hasImagePath) {
      const { error: storageError } = await supabase.storage
        .from("cabins")
        .upload(imgName, newCabin.image);

      // 3. Delete cabin if image upload fails
      if (storageError) {
        await undoCabinOperation(cabinData[0].id);
        throw new Error(`Storage Error: ${storageError.message}`);
      }
    }

    return cabinData;
  } catch (error) {
    if (error instanceof Error) {
      // Handle both cabinError and storageError
      if (error.message.startsWith("Cabin Error:")) {
        console.error("Error adding/updating cabin:", error.message);
      } else if (error.message.startsWith("Storage Error:")) {
        console.error("Error uploading image:", error.message);
      } else {
        // Handle generic errors (e.g., network errors)
        console.error("An unexpected error occurred:", error.message);
      }
    }
    throw error;
  }
}

// Extracted undo functionality
async function undoCabinOperation(cabinId: number) {
  try {
    await supabase.from("cabins").delete().eq("id", cabinId);
    console.log(
      `Cabin with ID ${cabinId} was deleted due to a failed image upload.`
    );
  } catch (error) {
    console.error("Failed to undo cabin operation:", error);
    throw error;
  }
}
