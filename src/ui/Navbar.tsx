import styled from "styled-components";

const StyledNav = styled.nav`
  background-color: var(--color-gray-0);
  padding: 1.2rem 4.8rem;
  border: 1px solid var(--color-gray-100);
`;

export default function Navbar() {
  return <StyledNav>Navbar</StyledNav>;
}
