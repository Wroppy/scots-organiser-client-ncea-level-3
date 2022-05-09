import './App.scss';
import Template from './Components/Template/Template';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Template/>}>
                <Route index element={<h1>Template</h1>}/>
            </Route>
        </Routes>
    </BrowserRouter>
}

export default App;
