import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { Booking } from "../../types/bookings";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

export default function Stats({
  bookings,
  confirmedStays,
  numDays,
  cabinCount,
}: {
  bookings: {
    created_at: string;
    totalPrice: number;
  }[];
  numDays: number;
  cabinCount: number;
  confirmedStays: Partial<Booking>[];
}) {
  //1.
  const numBookings = bookings.length;

  //2.
  const sales = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);

  //3.
  const check_ins = confirmedStays.length;

  //4.
  const occupancyRate =
    confirmedStays.reduce((acc, booking) => acc + (booking.numNights ?? 0), 0) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        color="blue"
        title="Bookings"
        value={numBookings.toString()}
        icon={<HiOutlineBriefcase />}
      />
      <Stat
        color="green"
        title="Sales"
        value={formatCurrency(sales)}
        icon={<HiOutlineBanknotes />}
      />
      <Stat
        color="indigo"
        title="Check-ins"
        value={check_ins.toString()}
        icon={<HiOutlineCalendarDays />}
      />
      <Stat
        color="yellow"
        title="Occupancy rate"
        value={`${Math.round(occupancyRate * 100)}%`}
        icon={<HiOutlineChartBar />}
      />
    </>
  );
}
