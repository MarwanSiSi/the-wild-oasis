import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import styled from "styled-components";

const Main = styled.main`
  background-color: var(--color-gray-50);
  padding: 4rem 4.8rem 6.4rem;
`;

const StyledDiv = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
`;

export default function AppLayout() {
  return (
    <StyledDiv>
      <Navbar />
      <Sidebar />

      <Main>
        <Outlet />
      </Main>
    </StyledDiv>
  );
}
