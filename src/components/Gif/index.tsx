import React, { useState } from "react";

import { Container, Img, Overflow, Span, CopyIcon, CheckIcon } from "./styles";

type PropsType = {
  imageURL: string;
  alt: string;
  embedUrl: string;
};

enum StatusEnum {
  IDLE,
  COPYING_TO_CLIPBOARD,
}

const Gif = ({ imageURL, alt, embedUrl }: PropsType) => {
  const [status, setStaus] = useState(StatusEnum.IDLE);
  const timeOut = 500;

  const copyUrl = async (url: string) => {
    setStaus(StatusEnum.COPYING_TO_CLIPBOARD);

    await navigator.clipboard.writeText(url);

    setTimeout(() => setStaus(StatusEnum.IDLE), timeOut);
  };

  return (
    <Container data-testid="gif-container">
      <Img src={imageURL} alt={alt} loading="lazy" />
      <Overflow>
        <Span>{alt}</Span>
        {status === StatusEnum.IDLE ? (
          <CopyIcon
            onClick={() => copyUrl(embedUrl)}
            role="button"
            data-testid="copy-icon"
          />
        ) : (
          <CheckIcon />
        )}
      </Overflow>
    </Container>
  );
};

export default Gif;
