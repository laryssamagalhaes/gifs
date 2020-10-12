import React from "react";

import { Bouncing } from "./styles";

const Loading = () => {
  return (
    <Bouncing data-testid="loading">
      <div></div>
      <div></div>
      <div></div>
    </Bouncing>
  )
}

export default Loading;