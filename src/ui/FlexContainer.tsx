import styled, { css } from "styled-components";

type FlexContainerProps = {
  orientation?: "horizontal" | "vertical";
};

const FlexContainer = styled.div<FlexContainerProps>`
  ${({ orientation = "vertical" }) => {
    if (orientation === "horizontal") {
      return css`
        justify-content: space-between;
        align-items: center;
      `;
    } else {
      return css`
        flex-direction: column;
        gap: 1.6rem;
      `;
    }
  }}

  display: flex;
`;

export default FlexContainer;
