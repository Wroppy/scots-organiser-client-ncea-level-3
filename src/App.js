// Imports react components
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import React, {useEffect} from "react";

// Importing the pages we want to render
import Template from './Components/Template/Template';
import Register from "./Components/UserInfoForm/Register/Register";
import Login from "./Components/UserInfoForm/Login/Login";
import ErrorPage from "./Components/ErrorPage/ErrorPage";
import SubjectsPage from "./Components/Subjects/SubjectsPage";
import GoalsPage from "./Components/GoalsPage/GoalsPage";
import TimetablePage from "./Components/Timetable/TimetablePage";
import TestingTemplate from "./Components/Template/TestingTemplate";
import Contact from "./Components/Contact/Contact";

// Importing the theme and the custom styles
import {ThemeProvider, createTheme} from "@mui/material/styles";
import themeOptions from "./Components/Themes/Dark/Dark";
import './App.scss';

const theme = createTheme(themeOptions);

function App() {
    // Hook for the heading at the top of the page.
    // Will be parsed into different components to change the heading

    // Sets up the theme for the application and the routing
    return <ThemeProvider theme={theme}><BrowserRouter>
        <Routes>
            <Route path="/" element={<Template/>}>
                <Route index element={<TestingTemplate/>}/>
                <Route path="subjects" element={<SubjectsPage/>}/>
                <Route path="register" element={<Register/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="*" element={<ErrorPage/>}/>
                <Route path="goals" element={<GoalsPage/>}/>
                <Route path="timetable" element={<TimetablePage/>}/>
                <Route path="contact" element={<Contact/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
    </ThemeProvider>
}

export default App;
