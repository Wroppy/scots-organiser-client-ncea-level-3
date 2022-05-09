import Button from "@mui/material/Button";
import "./Navbar.scss";

function Navbar(props) {
    let urls = props.urls;

    return <div className="nav-bar-container">
        <div className="nav-bar-header-container">
            Scots Hub
        </div>
        <div className="nav-bar-links-container">
            {urls.map((value, index) => {
                let url = value.url;
                let text = value.text;
                let iconClass = value.icon;
                return <Button key={index} className="nav-bar-button">
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