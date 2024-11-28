import SourceManager from "../sources/SourceManager";

function enableDark() {
  const isDark = localStorage.getItem("dark-mode");

  if (isDark === "enabled") {
    document.documentElement.classList.add("dark");
  }
}

function initialiseSourceManager() {
  const sourceManager = SourceManager.getInstance();
  sourceManager.loadSavedSources();
}

export default function startup() {
  document.documentElement.classList.add("no-transition");

  enableDark();
  initialiseSourceManager();

  setTimeout(() => {
    document.documentElement.classList.remove("no-transition");
  }, 0);
}