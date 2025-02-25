export type Booking = {
  id: string;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  status: BookingStatus;
  hasBreakfast: boolean;
  isPaid: boolean;
  observations: string;
  cabinID: number;
  guestID: number;
  cabins: {
    name: string;
  };
  guests: {
    fullName: string;
    email: string;
    country: string;
    countryFlag: string;
    nationalID: string;
  };
};

type SupabaseFilterMethod =
  | "eq"
  | "neq"
  | "gt"
  | "gte"
  | "lt"
  | "lte"
  | "like"
  | "ilike"
  | "is"
  | "in"
  | "cs"
  | "cd"
  | "sl"
  | "sr"
  | "nxl"
  | "nxr"
  | "adj";

export type Filter = {
  field: string; // The field to filter on (e.g., "status")
  value: string | number | boolean | null; // The value to filter by
  method: SupabaseFilterMethod; // The Supabase filter method
};

export type Sort = {
  field: string; // The field to sort by (e.g., "startDate")
  direction: "asc" | "desc"; // The sort direction
};

export type BookingStatus = "unconfirmed" | "checked-in" | "checked-out";
