import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Homepage } from "./components/Homepage";
import { Topbar } from "./components/topbar";
import { Searchpage } from "./components/Searchpage";
import { Librarypage } from "./components/Librarypage";
import { Playlistpage } from "./components/Playlistpage";
import { Albumpage } from "./components/Albumpage";
import { Artistpage } from "./components/Artistpage";
import { Settingspage } from "./components/Settingspage";
import { Downloadspage } from "./components/Downloadspage";
import { Setuppage } from "./components/Setuppage";

function App() {
  return (
    <Router>
      <div>
        <Topbar />
        <div>
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
