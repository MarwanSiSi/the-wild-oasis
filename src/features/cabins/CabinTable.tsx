import Spinner from "../../ui/Spinner";
import styled from "styled-components";
import CabinRow from "./CabinRow";
import { useGetCabins } from "./hooks/useGetCabins";
import Table from "../../ui/Table";
import { Cabin } from "../../types/cabin";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router";
import Empty from "../../ui/Empty";

const StyledDiv = styled.div`
  text-align: center;
`;

export default function CabinTable() {
  const { cabins, isFetching } = useGetCabins();
  const [searchParams] = useSearchParams();

  let filteredCabins;

  const filterValue = searchParams.get("discount") || "all";
  const sortByValue = searchParams.get("sortBy") || "name-asc";

  // 1) Filter cabins based on discount
  if (filterValue === "all") {
    filteredCabins = cabins;
  } else {
    filteredCabins = cabins?.filter((cabin: Cabin) => {
      if (filterValue === "no-discount") {
        return !cabin.discount;
      } else {
        return cabin.discount > 0;
      }
    });
  }

  // 2) Sort cabins based on sortBy
  if (sortByValue === "name-asc") {
    filteredCabins = filteredCabins?.sort((a: Cabin, b: Cabin) =>
      a.name.localeCompare(b.name)
    );
  } else if (sortByValue === "name-desc") {
    filteredCabins = filteredCabins?.sort((a: Cabin, b: Cabin) =>
      b.name.localeCompare(a.name)
    );
  } else if (sortByValue === "regularPrice-asc") {
    filteredCabins = filteredCabins?.sort(
      (a: Cabin, b: Cabin) => a.regularPrice - b.regularPrice
    );
  } else if (sortByValue === "regularPrice-desc") {
    filteredCabins = filteredCabins?.sort(
      (a: Cabin, b: Cabin) => b.regularPrice - a.regularPrice
    );
  } else if (sortByValue === "maxCapacity-asc") {
    filteredCabins = filteredCabins?.sort(
      (a: Cabin, b: Cabin) => a.maxCapacity - b.maxCapacity
    );
  } else {
    filteredCabins = filteredCabins?.sort(
      (a: Cabin, b: Cabin) => b.maxCapacity - a.maxCapacity
    );
  }

  if (isFetching) {
    return <Spinner />;
  }

  if (!cabins?.length) return <Empty resourceName="cabins" />;

  return (
    <Menus>
      <Table $columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <StyledDiv></StyledDiv>
          <StyledDiv>Cabin</StyledDiv>
          <StyledDiv>Capacity</StyledDiv>
          <StyledDiv>Price</StyledDiv>
          <StyledDiv>Discount</StyledDiv>
          <StyledDiv></StyledDiv>
        </Table.Header>

        <Table.Body
          data={filteredCabins}
          render={(cabin: Cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}
