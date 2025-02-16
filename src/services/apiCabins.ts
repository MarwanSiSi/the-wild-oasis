import { PostgrestError } from "@supabase/supabase-js";
import supabase from "./supabase";

export async function getCabins() {
  try {
    const { data, error } = await supabase.from("cabins").select("*");
    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    if (error instanceof PostgrestError) {
      console.error("Error fetching cabins", error.code, error.message);
    }
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
      console.error("Error deleting cabin", error.code, error.message);
      throw error;
    }
    throw error;
  }
}
