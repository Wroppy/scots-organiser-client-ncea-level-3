import './App.scss';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {useState} from "react";

import Template from './Components/Template/Template';
import Register from "./Components/UserInfoForm/Register/Register";
import Login from "./Components/UserInfoForm/Login/Login";

import {ThemeProvider, createTheme} from "@mui/material/styles";
import themeOptions from "./Components/Themes/Dark/Dark";

const theme = createTheme(themeOptions);


function App() {
    let [currentHeader, setCurrentHeader] = useState("Template");

    return <ThemeProvider theme={theme}><BrowserRouter>
        <Routes>
            <Route path="/" element={<Template heading={currentHeader}/>}>
                <Route index element={<h1>Template</h1>}/>
                <Route path="register" element={<Register setCurrentHeader={setCurrentHeader}/>}/>
                <Route path="login" element={<Login setCurrentHeader={setCurrentHeader}/>}/>
            </Route>
        </Routes>
    </BrowserRouter></ThemeProvider>

}

export default App;
