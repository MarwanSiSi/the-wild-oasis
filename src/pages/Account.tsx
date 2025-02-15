import Heading from "../ui/Heading";
import FlexContainer from "../ui/FlexContainer";

function Account() {
  return (
    <>
      <Heading as="h1">Update your account</Heading>

      <FlexContainer>
        <Heading as="h3">Update user data</Heading>
        <p>Update user data form</p>
      </FlexContainer>

      <FlexContainer>
        <Heading as="h3">Update password</Heading>
        <p>Update user password form</p>
      </FlexContainer>
    </>
  );
}

export default Account;
