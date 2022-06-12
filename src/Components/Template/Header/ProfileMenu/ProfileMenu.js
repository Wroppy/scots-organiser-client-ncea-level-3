import {IconButton, Link, Menu, MenuItem} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import React from "react";
import "./ProfileMenu.scss";

export default function ProfileMenu(props) {
    const disabled = props.disabled;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const iconButtonClicked = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const closeMenu = () => {
        setAnchorEl(null);
    };

    const signOut = () => {
        // Removes the JWT token from the local storage and then refreshes the page
        localStorage.removeItem("userAuthToken");
        window.location.href = "/login";
    }

    return <><IconButton disabled={disabled} onClick={iconButtonClicked}>
        <PersonIcon/>
    </IconButton>
    <Menu anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              transformOrigin={{ vertical: "top", horizontal: "center" }} anchorEl={anchorEl} open={open}
          onClose={closeMenu}>
        <MenuItem component={Link} href="/contact" onClick={closeMenu}>
            Contact Me
        </MenuItem>
        <MenuItem className="log-out-button" onClick={signOut}>
            Log Out
        </MenuItem>
    </Menu></>
}