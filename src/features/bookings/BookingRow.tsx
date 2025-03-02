import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import { Booking } from "../../types/bookings";
import Menus from "../../ui/Menus";
import { HiEye, HiTrash } from "react-icons/hi";
import { useNavigate } from "react-router";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiPencil,
} from "react-icons/hi2";
import { useCheckoutBooking } from "./hooks/useCheckoutBooking";
import { useDeleteBooking } from "./hooks/useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import BookingForm from "./BookingForm";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    // created_at,
    startDate,
    endDate,
    numNights,
    // numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}: {
  booking: Booking;
}) {
  const navigate = useNavigate();

  const { checkOut, isCheckingOut } = useCheckoutBooking();
  const { removeBooking, isDeleting } = useDeleteBooking();

  const statusToTagName: {
    [key in Booking["status"]]: "blue" | "green" | "silver";
  } = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  function handleViewClick() {
    navigate(`${bookingId}`);
  }

  function handleCheckInClick() {
    navigate(`${bookingId}/check-in`);
  }

  function handleCheckoutClick() {
    checkOut({
      id: +bookingId,
      data: {
        status: "checked-out",
      },
    });
  }

  function handleDeleteBooking() {
    removeBooking(+bookingId);
  }

  return (
    <Table.Row disabled={isCheckingOut || isDeleting}>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={+bookingId} />

          <Menus.List id={+bookingId}>
            <Menus.Button icon={<HiEye />} onClick={handleViewClick}>
              View details
            </Menus.Button>

            {status === "unconfirmed" && (
              <Modal.Open opens="edit-booking">
                <Menus.Button icon={<HiPencil />}>Edit Booking</Menus.Button>
              </Modal.Open>
            )}

            {status === "unconfirmed" ? (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={handleCheckInClick}
              >
                Check in
              </Menus.Button>
            ) : null}

            {status === "checked-in" ? (
              <Menus.Button
                icon={<HiArrowUpOnSquare />}
                onClick={handleCheckoutClick}
              >
                Check out
              </Menus.Button>
            ) : null}

            {status !== "checked-in" && (
              <Modal.Open opens="delete-booking">
                <Menus.Button icon={<HiTrash />}>Delete Booking</Menus.Button>
              </Modal.Open>
            )}
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="delete-booking">
          <ConfirmDelete
            onConfirm={handleDeleteBooking}
            resourceName={`booking #${bookingId}`}
            disabled={isDeleting}
          />
        </Modal.Window>

        <Modal.Window name="edit-booking">
          <BookingForm />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
