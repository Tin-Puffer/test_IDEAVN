import { Routes, Route } from 'react-router-dom';
import DefaultLayout from './components/Layouts/DefaultLayout';
import Bai1 from './features/auth/page/Bai1';
import Bai2 from './features/auth/page/Bai2';

import './App.css';
import Register from './features/auth/page/Register';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="" element={<Bai1></Bai1>}></Route>
                <Route path="/bai2" element={<Bai2></Bai2>}></Route>

                <Route path="/*" element={<Register></Register>}></Route>
            </Routes>
        </div>
    );
}

export default App;
