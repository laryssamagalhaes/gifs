import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
    font-family: "Montserrat", sans-serif;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background: #000;
  }

  .container {
    width: 1040px;
    margin: 50px auto;
  }

  .my-masonry-grid {
    display: flex;
    width: auto;
  }

  .my-masonry-grid_column:not(:first-child){
    padding-left: 15px;
    background-clip: padding-box;
  }
`;

export default GlobalStyle;
