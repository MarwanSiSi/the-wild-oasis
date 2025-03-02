import styled from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }

  margin-top: 0.4rem;
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
  width: 100%;
`;

export default function FormRow({
  label,
  errorMsg,
  children,
}: {
  label?: string;
  errorMsg?: string;
  children: React.ReactElement<HTMLInputElement>;
}) {
  return (
    <StyledFormRow>
      <Label htmlFor={children.props.id}>{label}</Label>
      {children}
      {errorMsg && <Error>{errorMsg}</Error>}
    </StyledFormRow>
  );
}
