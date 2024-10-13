import { Link } from "react-router-dom";
import ClickableIcon from "./ClickablaIcon";
import Tab from "./Tab";

export function Topbar() {
  return (
    <div className="fixed top-0 left-0 w-full z-10 shadow-md">
      <nav className="flex items-center justify-between pr-2">
        <div>
          <Link to="/">
            <Tab icon="home.svg" text="Home" />
          </Link>
        </div>
        <div className="flex space-x-2">
          <Link to="/settings">
            <ClickableIcon icon="settings.svg"/>
          </Link>
        </div>
      </nav>
      <div/>
    </div>
  );
};