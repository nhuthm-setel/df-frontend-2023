import React from "react";
import './ToggleDarkAndLightModeSwitch.css';

function ToggleDarkAndLightModeSwitch({ isDarkMode, onToggle }) {
    return (
        <label className="toggle-switch">
            <input type="checkbox" checked={isDarkMode} onChange={onToggle} />
            <span className="slider round"></span>
        </label>
    );
}
export default ToggleDarkAndLightModeSwitch;