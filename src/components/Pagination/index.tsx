import React from "react";

import { Container, Button } from "./styles";

type PropsType = {
  length: number;
  currentPage: number;
  onClick: (page: number) => void;
};

const Pagination = ({ length, currentPage, onClick }: PropsType) => {
  const pages = new Array(length).fill(0);

  return (
    <Container>
      {pages.map((_, i) => {
        const index = i + 1;
        
        return (
          <Button
            isActive={currentPage === index}
            key={index}
            onClick={() => onClick(index)}
          >
            {index}
          </Button>
        );
      })}
    </Container>
  );
};

export default Pagination;