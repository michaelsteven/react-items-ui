import React from "react";
import { useNavigate } from "react-router-dom";
import { Menu, MenuItem, MenuButton } from "./menu";
import { useMenuState } from "reakit/Menu";
import { useTranslation } from "react-i18next";

export default function HamburgerMenu() {
  const menu = useMenuState();
  const { t } = useTranslation("navigation");
  const navigate = useNavigate();

  const handleItemClick = (path: string): void => {
    menu.hide();
    navigate(path);
  };

  return (
    <>
      <MenuButton
        {...menu}
        style={{ color: "white" }}
        data-testid="component-navigation-hamburgermenu-div"
        aria-label={t("hamburger.menubutton.aria-label")}
      >
        <div className="hamburgerBar"></div>
        <div className="hamburgerBar"></div>
        <div className="hamburgerBar"></div>
      </MenuButton>
      <Menu {...menu} aria-label={t("hamburger.menu.aria-label")}>
        <MenuItem
          onClick={() => handleItemClick("/")}
          aria-label={t("hamburger.menu.items.home")}
          {...menu}
        >
          {t("hamburger.menu.items.home")}
        </MenuItem>
        <MenuItem
          onClick={() => handleItemClick("/items")}
          aria-label={t("hamburger.menu.items.items")}
          {...menu}
        >
          {t("hamburger.menu.items.items")}
        </MenuItem>
      </Menu>
    </>
  );
}