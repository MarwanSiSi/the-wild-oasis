import BookingDataBox from "../bookings/BookingDataBox";

import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import FlexContainer from "../../ui/FlexContainer";
import { useGetBooking } from "../bookings/hooks/useGetBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useSettings } from "../settings/hooks/useSettings";
import { useCheckInBooking } from "../bookings/hooks/useCheckInBooking";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckInBooking() {
  const moveBack = useMoveBack();

  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const { booking, isFetching } = useGetBooking();
  const { settings, isFetching: isFetchingSettings } = useSettings();

  const optionalBreakfastPrice =
    (settings?.breakfastPrice ?? 0) *
    (booking?.numGuests ?? 0) *
    (booking?.numNights ?? 0);

  const { id } = booking || {};

  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false);
  }, [booking?.isPaid]);

  const { checkIn, isCheckingIn } = useCheckInBooking();

  function handleCheckIn() {
    if (id)
      if (addBreakfast)
        checkIn({
          id: +id,
          data: {
            status: "checked-in",
            isPaid: true,
            hasBreakfast: true,
            totalPrice: (booking?.totalPrice ?? 0) + optionalBreakfastPrice,
            extrasPrice: (booking?.extrasPrice ?? 0) + optionalBreakfastPrice,
          },
        });
      else
        checkIn({
          id: +id,
          data: { status: "checked-in", isPaid: true },
        });
  }

  if (isFetching || isFetchingSettings) {
    return <Spinner />;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.4rem" }}>
      <FlexContainer orientation="horizontal">
        <Heading as="h1">Check in booking #{id}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </FlexContainer>

      {booking ? <BookingDataBox booking={booking} /> : null}

      {!booking?.hasBreakfast ? (
        <Box>
          <Checkbox
            checked={addBreakfast}
            id="addBreakfast"
            onChange={() => {
              setAddBreakfast((prev) => !prev);

              if (confirmPaid) setConfirmPaid(false);
            }}
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      ) : null}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((prev) => !prev)}
          id="confirmPaid"
          disabled={confirmPaid}
        >
          I confirm that {booking?.guests.fullName} has paid the total amount of{" "}
          {!addBreakfast
            ? formatCurrency(booking?.totalPrice ?? 0)
            : `${formatCurrency(booking?.totalPrice ?? 0)} + ${formatCurrency(
                optionalBreakfastPrice
              )} for breakfast
              `}
          .
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button disabled={!confirmPaid || isCheckingIn} onClick={handleCheckIn}>
          Check in booking #{id}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default CheckInBooking;
