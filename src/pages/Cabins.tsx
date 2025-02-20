import Heading from "../ui/Heading";
import FlexContainer from "../ui/FlexContainer";
import CabinTable from "../features/cabins/CabinTable";
import styled from "styled-components";
import AddCabin from "../features/cabins/AddCabin";

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.4rem;
  width: 100%;
`;
function Cabins() {
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

        <AddCabin />
      </FlexContainer>
    </>
  );
}

export default Cabins;
