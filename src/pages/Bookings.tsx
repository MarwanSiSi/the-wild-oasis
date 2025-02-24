import Heading from "../ui/Heading";
import FlexContainer from "./../ui/FlexContainer";
import BookingTable from "../features/bookings/BookingTable";

function Bookings() {
  return (
    <>
      <FlexContainer orientation="horizontal">
        <Heading as="h1">All bookings</Heading>
        <p>TEST</p>
      </FlexContainer>

      <BookingTable />
    </>
  );
}

export default Bookings;
