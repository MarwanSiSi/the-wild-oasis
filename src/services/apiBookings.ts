import { Booking, Filter, Sort } from "../types/bookings";
import { PAGE_SIZE } from "../utils/constants";
import { getToday } from "../utils/helpers";
import supabase from "./supabase";

interface GetBookingsParams {
  filters: Filter[]; // Array of filters
  sort: Sort[]; // Array of sort options
}

export async function getBookings(
  filterStrings: GetBookingsParams,
  page: number
) {
  let query = supabase
    .from("bookings")
    .select("*, cabins(name), guests(fullName,email)", {
      count: "exact",
    });

  // 1) Filters
  filterStrings.filters.forEach(({ field, value, method }) => {
    if (value !== "all")
      switch (method) {
        case "eq":
          query = query.eq(field, value);
          break;
        case "neq":
          query = query.neq(field, value);
          break;
        case "gt":
          query = query.gt(field, value);
          break;
        case "gte":
          query = query.gte(field, value);
          break;
        case "lt":
          query = query.lt(field, value);
          break;
        case "lte":
          query = query.lte(field, value);
          break;
        default:
          throw new Error(`Invalid filter method: ${method}`);
      }
  });

  // 2) SORT
  filterStrings.sort.forEach(({ field, direction }) => {
    query = query.order(field, { ascending: direction === "asc" });
  });

  // 3) PAGINATION
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  // 4) Execute query with the given filters
  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return { data, count };
}

export async function getBooking(id: number) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date: string) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data.map((item) => ({
    created_at: item.created_at as string,
    totalPrice: item.totalPrice as number,
    extrasPrice: item.extrasPrice as number,
  }));
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date: string) {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function updateBooking(
  id: number,
  obj: Partial<Record<keyof Booking, string | boolean | number>>
) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id: number): Promise<Booking> {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", id)
    .select()
    .single();
  console.log(data);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }

  return data;
}

export async function checkInBooking(
  id: number,
  obj: Partial<Record<keyof Booking, string | boolean | number>>
): Promise<Booking> {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", +id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  return data[0];
}
