import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

interface StyledListProps {
  position: { x: number; y: number };
}

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul<StyledListProps>`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

interface MenuContextType {
  openId?: number;
  open: (id: number) => void;
  close: () => void;
  position?: { x: number; y: number };
  setPosition: React.Dispatch<
    React.SetStateAction<undefined | { x: number; y: number }>
  >;
}

const MenuContext = createContext<MenuContextType>({
  openId: undefined,
  open: () => {},
  close: () => {},
  position: { x: 0, y: 0 },
  setPosition: () => {},
});

function Menus({ children }: { children: React.ReactNode }) {
  const [openId, setOpenId] = useState<number | undefined>(-1);
  const [position, setPosition] = useState<
    { x: number; y: number } | undefined
  >(undefined);

  const close = () => setOpenId(-1);
  const open = (id: number) => setOpenId(id);

  return (
    <MenuContext.Provider
      value={{ openId, open, close, position, setPosition }}
    >
      {children}
    </MenuContext.Provider>
  );
}

function Toggle({ id }: { id: number }) {
  const { openId, open, close, setPosition } = useContext(MenuContext);

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();

    // Get the position of the clicked button
    const button = e.currentTarget.closest("button")?.getBoundingClientRect();

    if (!button) return;

    setPosition({
      x: window.innerWidth - button?.x - button?.width,
      y: button?.y + button?.height + 8,
    });

    // Toggle the menu
    if (openId === -1 || openId !== id) {
      open(id);
    } else {
      close();
    }
  }

  return (
    <StyledToggle onClick={handleClick} className="toggle-button">
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({ id, children }: { id: number; children: React.ReactNode }) {
  const { openId, position, close } = useContext(MenuContext);

  const { ref } = useOutsideClick<HTMLUListElement>(close, ".toggle-button");

  if (openId !== id) return null;

  return createPortal(
    <StyledList
      ref={ref}
      position={{
        x: position?.x ?? 0,
        y: position?.y ?? 0,
      }}
    >
      {children}
    </StyledList>,
    document.body
  );
}

function Button({
  children,
  icon,
  onClick,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  onClick?: () => void;
}) {
  const { close } = useContext(MenuContext);

  function handleClick() {
    onClick?.();

    close();
  }

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
