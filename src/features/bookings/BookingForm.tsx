import styled from "styled-components";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import { FieldErrors, FieldValues, useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useSettings } from "../settings/hooks/useSettings";
import Spinner from "../../ui/Spinner";
import { subtractDates } from "../../utils/helpers";
import Checkbox from "../../ui/Checkbox";
import { useState } from "react";
import Textarea from "../../ui/Textarea";

const StyledFlexContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;
  margin-top: 2.4rem;
  margin-bottom: 0.4rem;
`;

export default function BookingForm({
  onCloseModal,
}: {
  onCloseModal?: () => void;
}) {
  const { settings, isFetching } = useSettings();
  const [addBreakfast, setAddBreakfast] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  // Get today's date in the format YYYY-MM-DD
  const today = new Date().toISOString().split("T")[0];

  function onSubmit(data: FieldValues) {
    console.log(data);
  }

  function onError(errors: FieldErrors) {
    console.log(errors);
  }

  if (isFetching) {
    return <Spinner />;
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow
        label="Start Date"
        errorMsg={errors.startDate?.message as string}
      >
        <Input
          type="date"
          min={today} // Disable dates before today
          {...register("startDate", { required: "Start date is required" })}
        />
      </FormRow>

      <FormRow label="End Date" errorMsg={errors.endDate?.message as string}>
        <Input
          type="date"
          min={today} // Disable dates before today
          {...register("endDate", {
            required: "End date is required",
            validate: (value) => {
              const startDate = new Date(getValues("startDate"));
              const endDate = new Date(value);

              if (endDate < startDate) {
                return "End date cannot be before start date";
              } else if (
                endDate.getDate() === startDate.getDate() &&
                endDate.getMonth() === startDate.getMonth() &&
                endDate.getFullYear() === startDate.getFullYear()
              ) {
                return "End date cannot be the same as start date";
              } else if (
                subtractDates(getValues("endDate"), getValues("startDate")) >
                (settings?.maxBookingLength ?? 0)
              ) {
                return `Booking cannot be longer than ${settings?.maxBookingLength} days`;
              }

              return true;
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Number of guests"
        errorMsg={errors.guests?.message as string}
      >
        <Input
          type="number"
          min={1}
          max={settings?.maxGuestsPerBooking}
          {...register("guests", {
            required: "Number of guests is required",
            validate: (value) => {
              if (value < 1) return "Must be at least 1 guest";
              if (value > (settings?.maxGuestsPerBooking ?? 0))
                return `Cannot exceed ${settings?.maxGuestsPerBooking} guests`;

              return true;
            },
          })}
        />
      </FormRow>

      <FormRow
        label={"Is there anything we need to know about"}
        errorMsg={errors.note?.message as string}
      >
        <Textarea placeholder="Add a note" {...register("note")} />
      </FormRow>

      <div
        style={{
          display: "flex",
          justifyContent: "start",
          marginTop: "2.4rem",
        }}
      >
        <Checkbox
          checked={addBreakfast}
          onChange={() => setAddBreakfast(!addBreakfast)}
          id="addBreakfast"
        >
          Add breakfast
        </Checkbox>
      </div>

      <StyledFlexContainer>
        <Button type="submit">Add Booking</Button>
        <Button onClick={onCloseModal} type="reset" variation="secondary">
          Cancel
        </Button>
      </StyledFlexContainer>
    </Form>
  );
}
