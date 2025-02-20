import { useUseQueryClient } from "../../hooks/useUseQueryClient";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useEditSettings } from "./hooks/useUpdateSettings";
import { useSettings } from "./hooks/useSettings";
import { Settings } from "../../types/settings";

function UpdateSettingsForm() {
  const { invalidateQuery } = useUseQueryClient();

  const { isFetching, settings } = useSettings();

  const { isUpdating, editSetting } = useEditSettings(invalidateQuery);

  if (isFetching) {
    return <Spinner />;
  }

  if (!settings) {
    return <p>Settings could not be loaded</p>;
  }

  function handleUpdateSetting(
    e: React.FocusEvent<HTMLInputElement>,
    setting: keyof Settings
  ) {
    const value = Number(e.target.value);

    if (!value) return;

    if (settings && value === settings[setting]) return;

    editSetting({ [setting]: value });
  }

  return (
    <Form>
      <FormRow errorMsg="" label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          disabled={isUpdating}
          onBlur={(e) => handleUpdateSetting(e, "minBookingLength")}
          defaultValue={settings?.minBookingLength}
        />
      </FormRow>

      <FormRow errorMsg="" label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          disabled={isUpdating}
          onBlur={(e) => handleUpdateSetting(e, "maxBookingLength")}
          defaultValue={settings?.maxBookingLength}
        />
      </FormRow>

      <FormRow errorMsg="" label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          disabled={isUpdating}
          onBlur={(e) => handleUpdateSetting(e, "maxGuestsPerBooking")}
          defaultValue={settings?.maxGuestsPerBooking}
        />
      </FormRow>

      <FormRow errorMsg="" label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          disabled={isUpdating}
          onBlur={(e) => handleUpdateSetting(e, "breakfastPrice")}
          defaultValue={settings?.breakfastPrice}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
