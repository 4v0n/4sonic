import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { useEffect, useRef, useState } from "react";
import startup from "./utils/startupUtil";
import Bottombar from "./components/shared/Bottombar";
import ManageSourcesPage from "./components/pages/ManageSourcesPage";
import AddSourcePage from "./components/pages/AddSourcePage";
import { AlbumPage } from "./components/pages/AlbumPage";
import { ArtistPage } from "./components/pages/ArtistPage";
import { DownloadsPage } from "./components/pages/DownloadsPage";
import { HomePage } from "./components/pages/HomePage";
import { LibraryPage } from "./components/pages/LibraryPage";
import { PlaylistPage } from "./components/pages/PlaylistPage";
import { SearchPage } from "./components/pages/SearchPage";
import { SettingsPage } from "./components/pages/SettingsPage";
import { SetupPage } from "./components/pages/SetupPage";
import { Topbar } from "./components/shared/Topbar";

export default function App() {
  const [firstStartup, setFirstStartup] = useState(true);
  const isStartupCalled = useRef(false);

  useEffect(() => {
    if (!isStartupCalled.current) {
      startup();
      isStartupCalled.current = true;
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
    return <SetupPage onComplete={completeSetup} />;
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Topbar />
        <div className="flex-grow overflow-y-auto max-h-[calc(100vh-3rem-5rem)] mt-12 pb-20 px-1">
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
            <Route path="/addsource" element={<AddSourcePage />} />
          </Routes>
        </div>
      </div>
      <Bottombar />
    </Router>
  );
}