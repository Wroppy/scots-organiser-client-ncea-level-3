import './App.scss';
import Template from './Components/Template/Template';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Register from "./Components/UserInfoForm/Register/Register";

import {ThemeProvider, createTheme} from "@mui/material/styles";
import themeOptions from "./Components/Themes/Dark/Dark";
import {useState} from "react";

const theme = createTheme(themeOptions);


function App() {
    let [currentHeader, setCurrentHeader] = useState("Template");

    return <ThemeProvider theme={theme}><BrowserRouter>
        <Routes>
            <Route path="/" element={<Template heading={currentHeader}/>}>
                <Route index element={<h1>Template</h1>}/>
                <Route path="register" element={<Register setCurrentHeader={setCurrentHeader}/>}/>
            </Route>
        </Routes>
    </BrowserRouter></ThemeProvider>

}

export default App;
