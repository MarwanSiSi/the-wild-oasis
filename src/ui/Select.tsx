import styled from "styled-components";
import React from "react";

// Define the props interface for Select
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
  activeValue: string;
  type?: string;
}

// Define the props interface for StyledSelect
interface StyledSelectProps {
  type?: string;
}

const StyledSelect = styled.select<StyledSelectProps>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

StyledSelect.defaultProps = {
  type: "white",
};

export default function Select({
  options,
  activeValue,
  type,
  ...props // Spread the remaining native props
}: SelectProps) {
  return (
    <StyledSelect value={activeValue} type={type} {...props}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}
