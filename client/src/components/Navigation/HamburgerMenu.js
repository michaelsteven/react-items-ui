import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/Menu';
import { useHistory } from 'react-router-dom';

export default function HamburgerMenu() {
    const history = useHistory();
    const [anchorEl, setAnchorEl ] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleItemClick = event =>{
        const {value} = event.currentTarget.dataset;
        history.push(value)
        handleMenuClose()
    }

    return (
        <div>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={handleMenu}
            >
            <MenuIcon />
            </IconButton>
            <MenuList
            id="menu-hamburger"
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
                }}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                >
                <MenuItem data-value="/" onClick={handleItemClick}>Home</MenuItem>
                <MenuItem id="hamburgerMenuItemItems" data-value="/items" onClick={handleItemClick}>Items</MenuItem>
                <MenuItem data-value="/orders" onClick={handleItemClick}>Orders</MenuItem>
            </MenuList>
        </div>
    );
}