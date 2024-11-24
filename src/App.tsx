import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { useEffect, useState } from "react";
import startup from "./utils/startupUtil";
import Bottombar from "./components/shared/Bottombar";
import { SetupPage } from "./components/pages/Setuppage";
import { Topbar } from "./components/shared/Topbar";
import { HomePage } from "./components/pages/Homepage";
import { AlbumPage } from "./components/pages/Albumpage";
import { ArtistPage } from "./components/pages/Artistpage";
import { DownloadsPage } from "./components/pages/Downloadspage";
import { LibraryPage } from "./components/pages/Librarypage";
import { PlaylistPage } from "./components/pages/Playlistpage";
import { SearchPage } from "./components/pages/Searchpage";
import { SettingsPage } from "./components/pages/Settingspage";
import ManageSourcesPage from "./components/pages/ManageSourcesPage";

export default function App() {

  const [firstStartup, setFirstStartup] = useState(true);
  const [initialised, setInitialised] = useState(false);

  useEffect(() => {
    if (!initialised) {
      startup();
      setInitialised(true);
    }

    const firstTime = localStorage.getItem("firstTime");
    if (firstTime === "false") {
      setFirstStartup(false);
    }
  }, []);

  function completeSetup() {
    setFirstStartup(false);
  }

  if (firstStartup) {
    return (
      <SetupPage onComplete={completeSetup} />
    );
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Topbar />
        <div className="flex-grow overflow-y-auto pt-14 px-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search/:query" element={<SearchPage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/playlist/:id" element={<PlaylistPage />} />
            <Route path="/album/:id" element={<AlbumPage />} />
            <Route path="/artist/:id" element={<ArtistPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/downloads" element={<DownloadsPage />} />
            <Route path="/managesources" element={<ManageSourcesPage />} />
          </Routes>
        </div>
      </div>
      <Bottombar />
    </Router>
  );
}