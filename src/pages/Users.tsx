import styled from "styled-components";
import SignupForm from "../features/authentication/SignupForm";
import Heading from "../ui/Heading";

const StyledDiv = styled.div`
  margin-bottom: 2.4rem;
`;

function NewUsers() {
  return (
    <>
      <StyledDiv>
        <Heading as="h1">Create a new user</Heading>
      </StyledDiv>
      <SignupForm />
    </>
  );
}

export default NewUsers;
