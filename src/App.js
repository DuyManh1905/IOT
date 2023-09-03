import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./component/Header";
import Dashboard from "./page/dashboard/Dashboard";
import Profile from "./page/profile/Profile";
import Sensor from "./page/sensor/Sensor";
import State from "./page/state/State";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Header />
                <div className="App">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/sensor" element={<Sensor />} />
                        <Route path="/state" element={<State />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
