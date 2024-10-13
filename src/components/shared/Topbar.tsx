import ClickableIcon from "./ClickablaIcon";
import Tab from "./Tab";

export function Topbar() {
  return (
    <div>
      <nav>
        <div>
          <Tab icon="home.svg" text="Home" href="/" />
        </div>
        <div>
          <ClickableIcon icon="home.svg" href="/"/>
        </div>
      </nav>
    </div>
  );
};