import { useState } from "react";
import Toggle from "../shared/Toggle";

export function Settingspage() {

  const currentState = localStorage.getItem("dark-mode");

  const [darkMode, setDarkMode] = useState(currentState === "enabled");

  const enableDark = () => {
    setDarkMode(true);

    localStorage.setItem("dark-mode", "enabled");
    document.documentElement.classList.add("dark");
  };

  const disableDark = () => {
    setDarkMode(false);

    localStorage.setItem("dark-mode", "disabled");
    document.documentElement.classList.remove("dark");
  };

  return (
    <div className="flex justify-center mt-4">
      <div className="w-full mac-w-md px-4">
        <div className="flex justify-between items-center ml-16 mr-16">
          <h1 className="font-medium">Dark Mode</h1>
          <Toggle initialState={darkMode} onEnable={disableDark} onDisable={enableDark} />
        </div>
      </div>
    </div>
  );
};