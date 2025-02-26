import { createContext, useContext } from "react";
import styled from "styled-components";

interface CommonRowProps {
  $columns: string;
  disabled?: boolean;
}

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const CommonRow = styled.div<CommonRowProps>`
  display: grid;
  grid-template-columns: ${(props) => props.$columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledRow = styled(CommonRow)`
  ${(props) => (props.disabled ? `opacity: 0.5;` : "")}
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

interface TableContextType {
  $columns: string;
}

const TableContext = createContext<TableContextType>({
  $columns: "",
});

function Table({
  $columns,
  children,
}: {
  $columns: string;
  children: React.ReactNode;
}) {
  return (
    <TableContext.Provider value={{ $columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
}

function Header({ children }: { children: React.ReactNode }) {
  const { $columns } = useContext(TableContext);

  return (
    <StyledHeader $columns={$columns} role="row" as="header">
      {children}
    </StyledHeader>
  );
}

function Row({
  children,
  disabled,
}: {
  children: React.ReactNode;
  disabled?: boolean;
}) {
  const { $columns } = useContext(TableContext);

  return (
    <StyledRow disabled={disabled} $columns={$columns} role="row">
      {children}
    </StyledRow>
  );
}

function Body<T>({
  render,
  data,
}: {
  render: (data: T) => React.ReactNode;
  data: T[] | undefined;
}) {
  if (!data?.length) return <Empty>No data to show at the moment</Empty>;

  return <StyledBody>{data.map((item) => render(item))}</StyledBody>;
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
