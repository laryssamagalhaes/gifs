import styled, { keyframes } from "styled-components";

const loader = keyframes`
  to {
    opacity: 0.1;
    transform: translate3d(0, -1rem, 0);
  }
`;

export const Bouncing = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 272px);

  & > div {
    width: 1rem;
    height: 1rem;
    margin: 3rem 0.2rem;
    background: #cc4cb4;
    border-radius: 50%;
    animation: ${loader} 0.6s infinite alternate;
  }

  & > div:nth-child(2) {
    animation-delay: 0.2s;
  }

  & > div:nth-child(3) {
    animation-delay: 0.4s;
  }
`;
