import React from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Badge from '@mui/material/Badge';
import useStyles from '../../style/drawerStyle';

export default function SimpleMenu({ menuIcon, menuItems, badgeNum, props }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ margin: 'auto' }}>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        edge="end"
        aria-label="account of current user"
        color="inherit"
        onClick={handleClick}
        size="large"
      >
        <Badge color="secondary" badgeContent={badgeNum}>
          {menuIcon}
        </Badge>
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {menuItems.map((menuItem, index) => (
          <Link to="/account" className={classes.link} key={index}>
            <MenuItem onClick={handleClose}>{menuItem}</MenuItem>
          </Link>
        ))}
      </Menu>
    </div>
  );
}
