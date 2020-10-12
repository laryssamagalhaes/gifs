import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export const Button = styled.button<{ isActive: boolean }>`
  background: #df44bd;

  background ${({ isActive }) =>
    isActive
      ? `linear-gradient(45deg, rgb(153, 51, 255) 0%, rgb(255, 102, 102) 100%)`
      : "transparent"};
  color: #fff;
  border: 0;
  padding: 15px;
  font-size: 16px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;

  &:not(:last-child) {
    margin-right: 10px;
  }

  &:hover {
    background: linear-gradient(
      45deg,
      rgb(153, 51, 255) 0%,
      rgb(255, 102, 102) 50%,
      rgb(153, 51, 255) 100%
    );
  }
`;
