import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";

const StyledAside = styled.aside`
  grid-row: 1 / -1;
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border: 1px solid var(--color-grey-100);
  display: flex;
  flex-direction: column;
  gap: 6rem;
`;

export default function Sidebar() {
  return (
    <StyledAside>
      <Logo />
      <MainNav />
    </StyledAside>
  );
}
