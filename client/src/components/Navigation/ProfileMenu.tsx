import React from "react";
import { useNavigate } from "react-router-dom";
import { Menu, MenuItem, MenuButton } from "./menu";
import { useMenuState } from "reakit/Menu";
import { MouseEventHandler } from "react";
import { useTranslation } from "react-i18next";

type MessagesMenuProps = {
  onLogoutClick: MouseEventHandler<HTMLButtonElement>;
};

export default function MessagesMenu(props: MessagesMenuProps) {
  const menu = useMenuState();
  const { t } = useTranslation("navigation");
  const navigate = useNavigate();

  const { onLogoutClick } = props;

  const handleItemClick = (path: string): void => {
    menu.hide();
    navigate(path);
  };

  return (
    <>
      <MenuButton
        {...menu}
        data-testid="component-navigation-profilemenu-button"
        aria-label={t("profile.menubutton.aria-label")}
      >
        {t("profile.menubutton.text")}
      </MenuButton>
      <Menu {...menu} aria-label={t("profile.menu.aria-label")}>
        <MenuItem
          {...menu}
          aria-label={t("profile.menu.items.profile")}
          onClick={() => handleItemClick("/profile")}
        >
          {t("profile.menu.items.profile")}
        </MenuItem>
        <MenuItem {...menu} aria-label={t("profile.menu.items.account")} onClick={menu.hide}>
          {t("profile.menu.items.account")}
        </MenuItem>
        <MenuItem {...menu} aria-label={t("profile.menu.items.logout")} onClick={onLogoutClick}>
          {t("profile.menu.items.logout")}
        </MenuItem>
      </Menu>
    </>
  );
}
