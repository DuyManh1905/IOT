import React from "react";
import { NavLink } from "react-router-dom";
import "./style.css";

// isActive cua NavLink: check component dang duoc active
const Header = () => {
    return (
        <nav className="nav">
            <div className="container">
                <NavLink to="/" className="iconNav">
                    <img
                        src="https://www.shutterstock.com/shutterstock/photos/1172566369/display_1500/stock-vector-internet-of-things-glyph-icon-silhouette-symbol-iot-signal-artificial-intelligence-negative-1172566369.jpg"
                        className="h-8 mr-3"
                        alt="Logo"
                    />
                </NavLink>

                <ul className="containerNav">
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? "iconNav active" : "iconNav"
                            }
                        >
                            Dasboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/profile"
                            className={({ isActive }) =>
                                isActive ? "iconNav active" : "iconNav"
                            }
                        >
                            Profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/sensor"
                            className={({ isActive }) =>
                                isActive ? "iconNav active" : "iconNav"
                            }
                        >
                            SensorData
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/state"
                            className={({ isActive }) =>
                                isActive ? "iconNav active" : "iconNav"
                            }
                        >
                            State
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Header;
