import Heading from "../ui/Heading";
import FlexContainer from "../ui/FlexContainer";
import CabinTable from "../features/cabins/CabinTable";
import styled from "styled-components";
import Button from "../ui/Button";
import { useState } from "react";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.4rem;
  width: 100%;
`;
function Cabins() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <FlexContainer orientation="horizontal">
        <StyledDiv>
          <Heading as="h1">All cabins</Heading>
          <p>Filter / Sort</p>
        </StyledDiv>
      </FlexContainer>
      <FlexContainer>
        <CabinTable />

        <Button onClick={() => setShowForm((prev) => !prev)}>
          Add new Cabin
        </Button>
        {showForm && <CreateCabinForm />}
      </FlexContainer>
    </>
  );
}

export default Cabins;
