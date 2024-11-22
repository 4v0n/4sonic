import { Link } from "react-router-dom";
import ClickableIcon from "./ClickablaIcon";
import Tab from "./Tab";
import SearchBar from "./Searchbar";

export function Topbar() {
  return (
    <div className="fixed w-full min-h-12 max-h-12 shadow-md">
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
          <SearchBar placeholder="Search" />
          <Link to="/settings">
            <ClickableIcon icon="settings.svg"/>
          </Link>
        </div>
      </nav>
      <div/>
    </div>
  );
};