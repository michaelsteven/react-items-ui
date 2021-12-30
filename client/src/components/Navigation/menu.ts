import { Menu as _Menu, MenuItem as _MenuItem, MenuButton as _MenuButton } from "reakit/Menu";
import styled from "styled-components";

export const MenuButton = styled(_MenuButton)`
  border: 0;
  color: white;
  &:not([disabled]):hover {
    cursor: pointer;
  }
`;

export const Menu = styled(_Menu)`
  display: flex;
  flex-direction: column;
  border: 1;
  border-style: groove;
  background: white;
  z-index: 9999;
`;

export const MenuItem = styled(_MenuItem)`
  display: flex;
  flex-direction: column;
  padding-left: 0.5rem;
  padding-right: 1.5rem;
  border: 0;
  text-decoration: none;
  color: black;
  &:not([disabled]):hover {
    color: white;
    background: blue;
    cursor: pointer;
  }
`;
