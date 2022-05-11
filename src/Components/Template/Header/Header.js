import Button from "@mui/material/Button";
import PersonIcon from "@mui/icons-material/Person";
import DensityMedium from "@mui/icons-material/DensityMedium";
import "./Header.scss";
import MobileNavbar from "../MobileNavbar/MobileNavbar";
import useWindowDimensions from "./../../Hooks/Viewport";
import {useState} from "react";

const breakPoint = 800;

function Header(props) {
    const changeMobileNavbar = () => {
        setMobileNavbarOpen(!mobileNavbarOpen);
    }

    let {width, height} = useWindowDimensions();
    let heading = props.heading;

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
                <Button className="header-button">
                    <PersonIcon/>
                </Button>
            </div>
        </div>
        {width <= breakPoint && <MobileNavbar urls={props.urls} style={mobileNavbarOpen ? {display: "flex"} : {display: "none"}}/>}
    </div>)

}

export default Header;
