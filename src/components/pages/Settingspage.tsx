import { useState } from "react";
import Toggle from "../shared/Toggle";
import Button from "../shared/Button";
import { Link } from "react-router-dom";

export function SettingsPage() {

  const currentState = localStorage.getItem("dark-mode");

  const [darkMode, setDarkMode] = useState(currentState === "enabled");

  function enableDark() {
    setDarkMode(true);

    localStorage.setItem("dark-mode", "enabled");
    document.documentElement.classList.add("dark");
  };

  function disableDark() {
    setDarkMode(false);

    localStorage.setItem("dark-mode", "disabled");
    document.documentElement.classList.remove("dark");
  };

  function resetSettings() {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="flex justify-center mt-4">
      <div className="w-full max-w-md px-4 ">

        <div className="flex justify-between items-center ml-16 mr-16">
          <h1 className="font-medium">Dark Mode</h1>
          <Toggle initialState={darkMode} onEnable={disableDark} onDisable={enableDark} />
        </div>

        <div className="flex justify-center mt-6">
          <Link to={"/managesources"}>
            <Button>
              <h1 className="w-32">
              Manage Sources
              </h1>
            </Button>
          </Link>
        </div>

        <div className="flex justify-center mt-6">
          <Button
            onClick={resetSettings}
          >
            <h1 className="w-32">
              Reset Application
            </h1>
          </Button>
        </div>
      </div>
    </div>
  );
};