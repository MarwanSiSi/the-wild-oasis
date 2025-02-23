import Spinner from "../../ui/Spinner";
import styled from "styled-components";
import CabinRow from "./CabinRow";
import { useGetCabins } from "./hooks/useGetCabins";
import Table from "../../ui/Table";
import { Cabin } from "../../types/cabin";
import Menus from "../../ui/Menus";

const StyledDiv = styled.div`
  text-align: center;
`;

export default function CabinTable() {
  const { cabins, isFetching } = useGetCabins();

  if (isFetching) {
    return <Spinner />;
  }
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <StyledDiv></StyledDiv>
          <StyledDiv>Cabin</StyledDiv>
          <StyledDiv>Capacity</StyledDiv>
          <StyledDiv>Price</StyledDiv>
          <StyledDiv>Discount</StyledDiv>
          <StyledDiv></StyledDiv>
        </Table.Header>

        <Table.Body
          data={cabins}
          render={(cabin: Cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}
