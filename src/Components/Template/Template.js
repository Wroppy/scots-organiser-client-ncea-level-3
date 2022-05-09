import {Outlet} from 'react-router-dom';
import Button from '@mui/material/Button';
import "./Template.scss";
import {useState} from 'react';
import PersonIcon from '@mui/icons-material/Person';
import Navbar from './Navbar/Navbar';
import "./../../resources/icons-span/style.css";

let urls = [
    {"text": "Dashboard", url: "", icon: "home"},
    {"text": "Tasks", url: "", icon: "tasks"},
    {"text": "Homework", url: "", icon: "homework"},
    {"text": "Assignments", url: "", icon: "assignments"},
    {"text": "Timetable", url: "", icon: "calendar"},
    {"text": "Goals", url: "", icon: "goals"},
]

function Template() {
    let [currentHeader, setCurrentHeader] = useState("");

    return <div className="container">
        <Navbar urls={urls}/>
        <div className="content-container">
            <div className="content-header-container">
                <span className="header-text">
                    {currentHeader}
                </span>
                <Button className="header-button">
                    <PersonIcon/>
                </Button>
            </div>
            <Outlet/>
        </div>
    </div>
}

export default Template;