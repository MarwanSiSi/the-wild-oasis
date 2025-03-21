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
import { useDeleteBooking } from "./hooks/useDeleteBooking";
import CheckoutButton from "../check-in-out/CheckoutButton";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate();

  const { booking, isFetching } = useGetBooking();
  const { removeBooking, isDeleting } = useDeleteBooking();

  const status: BookingStatus = booking?.status ?? "unconfirmed";

  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (isFetching) return <Spinner />;

  if (!booking) return <Empty resourceName="booking" />;

  function handleCheckInClick() {
    navigate(`check-in`);
  }

  function handleDeleteBooking() {
    removeBooking(booking?.id ? +booking.id : 0);

    navigate("/bookings");
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

      <Modal>
        <ButtonGroup>
          <Modal.Open opens="delete-booking">
            <Button
              disabled={booking?.status === "checked-in"}
              variation="danger"
            >
              Delete Booking
            </Button>
          </Modal.Open>

          {status === "unconfirmed" ? (
            <Button onClick={handleCheckInClick}>Check in</Button>
          ) : status === "checked-in" ? (
            <CheckoutButton bookingId={booking?.id ? booking.id : ""} />
          ) : null}

          <Button variation="secondary" onClick={moveBack}>
            Back
          </Button>
        </ButtonGroup>

        <Modal.Window name="delete-booking">
          <ConfirmDelete
            onConfirm={handleDeleteBooking}
            resourceName={`booking ${booking?.id}`}
            disabled={isDeleting}
          />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default BookingDetail;
