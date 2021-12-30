import styled, { createGlobalStyle } from "styled-components";
import { Link } from "react-router-dom";

export const colors = {
  green: "#4cae4c",
  yellow: "#eea236",
  red: "#d43f3a",
};

export const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu",
      "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body, h1, h2, h3, h4, h5, h6, p, ol, ul {
    margin: 0;
    padding: 0;
    font-weight: normal;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  button, input, select, textarea {
    background: transparent;
    font: inherit;
  }
`;

export const Page = styled.main`
  position: relative;
  max-width: 960px;
  margin: 0 auto;
  padding: 16px;
  background-color: white;
  padding-left: 8rem;
  padding-top: 3rem;
  padding-bottom: 3rem;
`;

export const Title = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 16px 0;
  font-size: 2.5em;
`;

export const NavLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 16px;
  font-size: 1rem;
  text-decoration: none;
`;

export const Icon = styled.img`
  height: 24px;
`;
