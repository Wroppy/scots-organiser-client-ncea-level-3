import {Outlet} from 'react-router-dom';
import "./Template.scss";
import {useState} from 'react';
import Navbar from './Navbar/Navbar';
import "./../../resources/icons-span/style.css";
import Header from './Header/Header';
import "./TemplateMobile.scss";

// Urls for the different pages
let urls = [
    {"text": "Dashboard", url: "", icon: "home"},
    {"text": "Tasks", url: "", icon: "tasks"},
    {"text": "Homework", url: "", icon: "homework"},
    {"text": "Assignments", url: "", icon: "assignments"},
    {"text": "Timetable", url: "", icon: "calendar"},
    {"text": "Goals", url: "", icon: "goals"},
]

function Template(props) {
    let currentHeader = props.heading;
    const [showNav, setShowNav] = useState(true)


    return <div className="container">
        {showNav && <Navbar urls={urls}/>}
        <div className="content-container">
            <Header heading={currentHeader} urls={urls} showNav={showNav}/>
            <Outlet setShowNav={setShowNav}/>
        </div>
    </div>
}

export default Template;