import { Link } from "react-router-dom";
import ClickableIcon from "./ClickablaIcon";
import Tab from "./Tab";
import SearchBar from "./Searchbar";

export function Topbar() {
  return (
    <div className="fixed w-full min-h-12 max-h-12 shadow-md">
      <nav className="flex items-center justify-between pr-2">
        <div>
          <Link to="/">
            <Tab icon="home.svg" text="Home" />
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