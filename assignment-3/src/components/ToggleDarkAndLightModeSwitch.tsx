import React from "react";
import './ToggleDarkAndLightModeSwitch.css';

function ToggleDarkAndLightModeSwitch({ isDarkMode, onToggle }) {
    return (
        <label className="toggle-switch" htmlFor="darkModeToggle">
            <input
                type="checkbox"
                checked={isDarkMode}
                onChange={onToggle}
                id="darkModeToggle"
            />
            <span className="slider round" />
        </label>
    );
}

export default ToggleDarkAndLightModeSwitch;
