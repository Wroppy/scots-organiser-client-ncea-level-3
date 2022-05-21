import Button from "@mui/material/Button";
import PersonIcon from "@mui/icons-material/Person";
import DensityMedium from "@mui/icons-material/DensityMedium";
import "./Header.scss";
import {useLocation} from "react-router-dom";
import MobileNavbar from "../MobileNavbar/MobileNavbar";
import useWindowDimensions from "./../../Hooks/Viewport";
import {useMemo, useState} from "react";
import React from "react";

const breakPoint = 800;

function Header(props) {
    const changeMobileNavbar = () => {
        setMobileNavbarOpen(!mobileNavbarOpen);
    }


    // Disables the nav bar if the url is in the disabled list
    const location = useLocation();

    const navUrls = props.navUrls;
    const disableNav = useMemo(() => {
        return !navUrls.includes(location.pathname);
    }, [location]);

    // Header automatically changes title based on current page
    const heading = useMemo(() => {
        if (location.pathname === "/") {
            return "Template"
        }
        // If it isn't part of the usual paths, it will change the navbar to error
        if (!["/login", "/register", ...navUrls].includes(location.pathname)) {
            return "Error 404 Page not found"
        }

        return location.pathname[1].toUpperCase() + location.pathname.slice(2);
    }, [location]);

    let {width, height} = useWindowDimensions();
    // const heading = props.heading;

    const [mobileNavbarOpen, setMobileNavbarOpen] = useState(false);

    return (<div className="content-header">
        <div className="content-header-container">
            <div className="content-header-mobile-container">
                <div className="content-header-mobile-menu">
                    <Button color="primary" className="nav-bar-open-button" onClick={changeMobileNavbar}>
                        <DensityMedium/>
                    </Button>
                </div>
                <div className="content-header-title">
                    Scots Core
                </div>
            </div>
            <div className="content-header-user-container">
                <div className="header-text">
                    {heading}
                </div>
                <Button className="header-button" disabled={disableNav}>
                    <PersonIcon/>
                </Button>
            </div>
        </div>
        {width <= breakPoint &&
            <MobileNavbar disableNav={disableNav} urls={props.urls}
                          style={mobileNavbarOpen ? {display: "flex"} : {display: "none"}}/>}
    </div>)

}

export default Header;
