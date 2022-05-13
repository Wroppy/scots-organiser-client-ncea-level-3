// Imports react components
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {useState} from "react";

// Importing the pages we want to render
import Template from './Components/Template/Template';
import Register from "./Components/UserInfoForm/Register/Register";
import Login from "./Components/UserInfoForm/Login/Login";

// Importing the theme and the custom styles
import {ThemeProvider, createTheme} from "@mui/material/styles";
import themeOptions from "./Components/Themes/Dark/Dark";
import './App.scss';

const theme = createTheme(themeOptions);

function App() {
    // Hook for the heading at the top of the page.
    // Will be parsed into different components to change the heading
    const [showNav, setShowNav] = useState(true)

    // Sets up the theme for the application and the routing
    return <ThemeProvider theme={theme}><BrowserRouter>
        <Routes>
            <Route path="/" element={<Template showNav={showNav}/>}>
                <Route index element={<h1>Template</h1>}/>
                <Route path="register" element={<Register/>}/>
                <Route path="login" element={<Login/>}/>
            </Route>
        </Routes>
    </BrowserRouter></ThemeProvider>
}

export default App;
