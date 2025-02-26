import Button from "../../ui/Button";
import { useCheckoutBooking } from "../bookings/hooks/useCheckoutBooking";

function CheckoutButton({ bookingId }: { bookingId: string }) {
  const { checkOut, isCheckingOut } = useCheckoutBooking();

  function handleCheckout() {
    checkOut({
      id: +bookingId,
      data: {
        status: "checked-out",
      },
    });
  }

  return (
    <Button
      variation="primary"
      size="small"
      onClick={handleCheckout}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
