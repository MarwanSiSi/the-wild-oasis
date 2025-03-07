import styled from "styled-components";
import NavbarMenu from "./NavbarMenu";
import UserAvatar from "../features/authentication/UserAvatar";

const StyledNav = styled.nav`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border: 1px solid var(--color-grey-100);

  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: end;
`;

export default function Navbar() {
  return (
    <StyledNav>
      <UserAvatar />
      <NavbarMenu />
    </StyledNav>
  );
}
