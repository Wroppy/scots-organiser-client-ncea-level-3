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

    const [mobileNavbarOpen, setMobileNavbarOpen] = useState(true);

    return (<div className="content-header">
        <div className="content-header-container">
            <div className="content-header-mobile-container">
                <div className="content-header-mobile-menu">
                    <Button color="primary" onClick={changeMobileNavbar}>
                        <DensityMedium/>
                    </Button>
                </div>
                <div className="content-header-title">
                    Scots Hub
                </div>
            </div>
            <div className="content-header-user-container">
            <span className="header-text">
                {heading}
            </span>
                <Button className="header-button">
                    <PersonIcon/>
                </Button>
            </div>
        </div>
        {width <= breakPoint && <MobileNavbar urls={props.urls} style={mobileNavbarOpen ? {display: "flex"} : {display: "none"}}/>}
    </div>)

}

export default Header;
