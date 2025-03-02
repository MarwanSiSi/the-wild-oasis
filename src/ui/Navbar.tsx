import styled from "styled-components";
import Logout from "../features/authentication/Logout";

const StyledNav = styled.nav`
  background-color: var(--color-gray-0);
  padding: 1.2rem 4.8rem;
  border: 1px solid var(--color-gray-100);
`;

export default function Navbar() {
  return (
    <StyledNav>
      <Logout />
    </StyledNav>
  );
}
