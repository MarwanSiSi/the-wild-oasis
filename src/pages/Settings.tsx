import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";
import FlexContainer from "../ui/FlexContainer";
import Heading from "../ui/Heading";

function Settings() {
  return (
    <FlexContainer>
      <Heading as="h1">Update hotel settings</Heading>
      <UpdateSettingsForm />
    </FlexContainer>
  );
}

export default Settings;
