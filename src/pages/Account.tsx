import Heading from "../ui/Heading";
import FlexContainer from "../ui/FlexContainer";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import styled from "styled-components";

const StyledDiv = styled.div`
  margin-bottom: 2.4rem;
`;

function Account() {
  return (
    <>
      <StyledDiv>
        <Heading as="h1">Update your account</Heading>
      </StyledDiv>
      <FlexContainer>
        <Heading as="h3">Update user data</Heading>
        <UpdateUserDataForm />
      </FlexContainer>

      <FlexContainer>
        <Heading as="h3">Update password</Heading>
        <UpdatePasswordForm />
      </FlexContainer>
    </>
  );
}

export default Account;
