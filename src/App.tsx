import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Homepage } from "./components/pages/Homepage";
import { Topbar } from "./components/shared/Topbar";
import { Searchpage } from "./components/pages/Searchpage";
import { Librarypage } from "./components/pages/Librarypage";
import { Playlistpage } from "./components/pages/Playlistpage";
import { Albumpage } from "./components/pages/Albumpage";
import { Artistpage } from "./components/pages/Artistpage";
import { Settingspage } from "./components/pages/Settingspage";
import { Downloadspage } from "./components/pages/Downloadspage";
import { Setuppage } from "./components/pages/Setuppage";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Topbar />
        <div className="flex-grow overflow-y-auto pt-10 px-1">
          <Routes>
            <Route path="/" element={<Homepage/>} />
            <Route path="/search/:query" element={<Searchpage />} />
            <Route path="/library" element={<Librarypage />} />
            <Route path="/playlist/:id" element={<Playlistpage />} />
            <Route path="/album/:id" element={<Albumpage />} />
            <Route path="/artist/:id" element={<Artistpage />} />
            <Route path="/settings" element={<Settingspage />} />
            <Route path="/downloads" element={<Downloadspage />} />
            <Route path="/setup" element={<Setuppage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
