import { Link } from "react-router-dom";
import Button from "./Button";
import Tab from "./Tab";
import InputBar from "./InputBar";

export function Topbar() {
  return (
    <div className="fixed w-full min-h-12 max-h-12 shadow-md bg-background-light dark:bg-background-dark">
      <nav className="flex items-center justify-between pr-2">
        <div className="flex items-center">
          <Link to="/">
            <Tab icon="home.svg" text="Home" />
          </Link>
          <Link to="/library">
            <Tab icon="home.svg" text="Library" />
          </Link>
        </div>
        <div className="flex space-x-2">
          <InputBar icon="search.svg" placeholder="Search" />
          <Link to="/settings">
            <Button icon="settings.svg"/>
          </Link>
        </div>
      </nav>
      <div/>
    </div>
  );
};