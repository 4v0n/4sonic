/** @type {import('tailwindcss').Config} */

export const darkMode = "class";
export const content = ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"];
export const theme = {
  extend: {
    colors: {
      background: {
        dark: "#131419",
        light: "#e7fbf1",
      },
      surface1: {
        dark: "#28292e",
        light: "#ffffff",
      },
      text: {
        dark: "#ffffff",
        light: "#000000",
      },
      title: {
        dark: "#b2f3d4",
        light: "#b2f3d4",
      },
      button: {
        dark: "#717275",
        light: "#ffffff",
      },
      success: {
        dark: "#b2f3d4",
        light: "#b2f3d4",
      },
      danger: {
        dark: "#fca7ae",
        light: "#fca7ae",
      },
      icon: {
        dark: "#12e09f",
        light: "#12e09f",
      },
      stroke: {
        dark: "#8c8c8f",
        light: "#8c8c8f",
      },
      border: {
        dark: "#28292e",
        light: "#ffffff",
      },
    },
  },
};
export const plugins = [];

