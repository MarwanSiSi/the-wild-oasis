import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import styled from "styled-components";

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
`;

const StyledDiv = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 26rem 1fr;

  grid-template-rows: auto 1fr;
`;

const Container = styled.div`
  max-width: 120rem;
  margin-left: auto;
  margin-right: auto;
`;

export default function AppLayout() {
  return (
    <StyledDiv>
      <Navbar />
      <Sidebar />

      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledDiv>
  );
}
