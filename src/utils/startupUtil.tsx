function enableDark() {
  const isDark = localStorage.getItem("dark-mode");

  if (isDark === "enabled") {
    document.documentElement.classList.add("dark");
  }
}

export default function startup() {
  document.documentElement.classList.add("no-transition");

  enableDark();

  setTimeout(() => {
    document.documentElement.classList.remove("no-transition");
  }, 0);
}