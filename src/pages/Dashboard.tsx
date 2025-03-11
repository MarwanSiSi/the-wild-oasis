import styled from "styled-components";
import DashboardFilter from "../features/dashboard/DashboardFilter";
import DashboardLayout from "../features/dashboard/DashboardLayout";
import Heading from "../ui/Heading";
import FlexContainer from "./../ui/FlexContainer";

const StyledDiv = styled.div`
  margin-bottom: 2.4rem;
`;

function Dashboard() {
  return (
    <>
      <StyledDiv>
        <FlexContainer orientation="horizontal">
          <Heading as="h1">Dashboard</Heading>
          <DashboardFilter />
        </FlexContainer>
      </StyledDiv>

      <DashboardLayout />
    </>
  );
}

export default Dashboard;
