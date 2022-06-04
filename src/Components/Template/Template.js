import {Outlet} from 'react-router-dom';
import "./Template.scss";
import {useState} from 'react';
import Navbar from './Navbar/Navbar';
import "./../../resources/icons-span/style.css";
import Header from './Header/Header';
import "./TemplateMobile.scss";
import React from "react";


// Urls for the different pages
const URLS = [
    {"text": "Dashboard", url: "", icon: "home"},
    {"text": "Timetable", url: "/timetable", icon: "calendar"},
    {"text": "Subjects", url: "/subjects", icon: "books"},
    {"text": "Tasks", url: "", icon: "tasks"},
    {"text": "Assignments", url: "", icon: "assignments"},
    {"text": "Goals", url: "/goals", icon: "goals"},
];

const NAVBAR_URLS = [
    "/template",
    "/timetable",
    "/subjects",
    "/goals",
    "/"
];

function Template(props) {
    return <div className="container">
        <Navbar urls={URLS} navUrls={NAVBAR_URLS}/>
        <div className="content-container">
            <Header urls={URLS} navUrls={NAVBAR_URLS}/>
            <Outlet/>
        </div>
    </div>
}

export default Template;