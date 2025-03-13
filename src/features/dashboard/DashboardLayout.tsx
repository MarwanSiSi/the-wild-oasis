import styled from "styled-components";
import { useRecentBookings } from "./hooks/useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./hooks/useRecentStays";
import Stats from "./Stats";
import { useGetCabins } from "../cabins/hooks/useGetCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout() {
  const { bookings, isPending: isFetchingRecentBookings } = useRecentBookings();
  const {
    stays,
    confirmedStays,
    isPending: isFetchingRecentStays,
    numDays,
  } = useRecentStays();

  const { cabins, isFetching: isFetchingCabins } = useGetCabins();

  if (isFetchingRecentBookings || isFetchingRecentStays) return <Spinner />;

  if (!bookings || !stays || !confirmedStays || isFetchingCabins || !cabins)
    return null;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        cabinCount={cabins.length}
        numDays={numDays}
      />
      <div>Today's activity</div>
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}
