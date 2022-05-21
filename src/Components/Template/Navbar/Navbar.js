import Button from "@mui/material/Button";
import "./Navbar.scss";
import {useLocation, Link} from "react-router-dom";
import {useMemo} from "react";
import React from "react";


function Navbar(props) {
    const urls = props.urls;

    // Disables the nav bar if the url is in the disabled list
    const navUrls = props.navUrls;
    const location = useLocation();
    const disableNav = useMemo(() => {
        return !navUrls.includes(location.pathname);
    }, [location]);

    return <div className="nav-bar-container">
        <div className="nav-bar-header-container">
            Scots Core
        </div>
        <div className="nav-bar-links-container">
            {urls.map((value, index) => {
                let url = value.url;
                let text = value.text;
                let iconClass = value.icon;
                return <Button component={Link} to={url} disabled={disableNav} key={index} className="nav-bar-button">
                    <div className="nav-bar-button-text">
                        <span className={`icon-${iconClass} nav-bar-icon`}/>
                        <span>{text}</span>
                    </div>
                </Button>
            })}
        </div>
    </div>
}

export default Navbar;