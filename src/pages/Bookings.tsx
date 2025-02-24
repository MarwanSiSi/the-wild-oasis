import Heading from "../ui/Heading";
import FlexContainer from "./../ui/FlexContainer";
import BookingTable from "../features/bookings/BookingTable";
import styled from "styled-components";
import BookingTableOperations from "../features/bookings/BookingTableOperations";

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.4rem;
  width: 100%;
`;

function Bookings() {
  return (
    <>
      <FlexContainer orientation="horizontal">
        <StyledDiv>
          <Heading as="h1">All Bookings</Heading>
          <BookingTableOperations />
        </StyledDiv>
      </FlexContainer>

      <BookingTable />
    </>
  );
}

export default Bookings;
