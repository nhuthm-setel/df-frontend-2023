import React from "react";
import "./Header.css"
import ToggleDarkAndLightModeSwitch from "./ToggleDarkAndLightModeSwitch";
import Avatar from "./Avatar";

function Header({ isDarkMode, onToggle }) {
    return (
        <header className="header">
            <div className="header-left">
                <h1>Bookstore</h1>
            </div>
            <div className="header-right">
                <ToggleDarkAndLightModeSwitch isDarkMode={isDarkMode} onToggle={onToggle} />
                <Avatar />
            </div>
         </header>
    );
}
export default Header;