import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import FlexContainer from "../../ui/FlexContainer";
import { useNavigate } from "react-router";
import { useGetBooking } from "./hooks/useGetBooking";
import Spinner from "../../ui/Spinner";
import { BookingStatus } from "../../types/bookings";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate();

  const { booking, isFetching } = useGetBooking();

  const status: BookingStatus = booking?.status ?? "unconfirmed";

  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (isFetching) return <Spinner />;

  function handleCheckInClick() {
    navigate(`check-in`);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.4rem" }}>
      <FlexContainer orientation="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{booking?.id}</Heading>
          <Tag type={statusToTagName[status]}>{status?.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </FlexContainer>

      {booking ? <BookingDataBox booking={booking} /> : null}

      <ButtonGroup>
        {status === "unconfirmed" ? (
          <Button disabled={booking?.isPaid} onClick={handleCheckInClick}>
            Check in
          </Button>
        ) : null}

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default BookingDetail;
