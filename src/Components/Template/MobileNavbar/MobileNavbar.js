import Button from "@mui/material/Button";
import "./MobileNavbar.scss";
import {Link} from "react-router-dom";

function MobileNavbar(props) {
    let urls = props.urls;
    const disableNav = props.disableNav;
    const style = props.style;

    return <div className="mobile-navbar-container" style={style}>
        <div className="mobile-nav-bar-links-container">
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

export default MobileNavbar;