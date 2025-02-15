import Heading from "../ui/Heading";
import FlexContainer from "../ui/FlexContainer";
import CabinTable from "../features/cabins/CabinTable";

function Cabins() {
  return (
    <>
      <FlexContainer orientation="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </FlexContainer>
      <FlexContainer orientation="horizontal">
        <CabinTable />
      </FlexContainer>
    </>
  );
}

export default Cabins;
