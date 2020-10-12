import styled, { css } from "styled-components";

import { ReactComponent as Copy } from "../../images/copy-icon.svg";
import { ReactComponent as Check } from "../../images/check-icon.svg";

export const Overflow = styled.div`
  display: none;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  color: #fff;
  padding: 15px;
  background: rgba(0, 0, 0, 0.5);
`;

export const Container = styled.div`
  position: relative;
  margin-bottom: 15px;

  &:hover {
    ${Overflow} {
      display: block;
    }
  }
`;

export const Img = styled.img`
  background: linear-gradient(
    125deg,
    rgba(151, 151, 151, 0) 0%,
    rgba(151, 151, 151, 0.5) 100%
  );
  width: 100%;
  min-height: 200px;
  border-radius: 4px;
  position: relative;
`;

export const Span = styled.span`
  font-size: 12px;
`;

const Icon = css`
  position: absolute;
  right: 20px;
  bottom: 20px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.5);
  }
`;

export const CopyIcon = styled(Copy)`
  ${Icon}
`;

export const CheckIcon = styled(Check)`
  ${Icon}
`;
