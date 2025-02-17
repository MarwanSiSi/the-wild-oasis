import { PostgrestError } from "@supabase/supabase-js";
import supabase from "./supabase";
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

export async function addCabin(newCabin: FieldValues) {
  console.log(newCabin);

  try {
    const { data, error } = await supabase
      .from("cabins")
      .insert([newCabin])
      .select();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    if (error instanceof PostgrestError) {
      // Handle Supabase-specific errors
      console.error("Error adding cabin", error.code, error.message);
    } else if (error instanceof Error) {
      // Handle generic errors (e.g., network errors)
      console.error("An unexpected error occurred:", error.message);
    }
    // Re-throw the error to propagate it further
    throw error;
  }
}
