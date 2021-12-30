import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ProfileMenu from "../Navigation/ProfileMenu";
import HamburgerMenu from "../Navigation/HamburgerMenu";
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';

export default function Header() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [auth, setAuth] = React.useState(true);
  const handleChange = (event: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
    setAuth(event.target.checked);
  };

  const handleLogoutClick = () => {
    navigate("/appid/logout");
    window.location.reload();
  };

  return (
    <div className="header" data-testid="component-header-div">
      <div className="items" data-testid="component-header-upper-div">
        <HamburgerMenu />
        <Link to={"/"}>{t("app_name")}</Link>

        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={auth}
                onChange={handleChange}
                aria-label="login switch"
              />
            }
            label={auth ? 'Logout' : 'Login'}
          />
        </FormGroup>
        {auth && (
          <ProfileMenu onLogoutClick={handleLogoutClick} />
        )}
      </div>
    </div>
  );
}
