import { useEffect, useState } from "react";

export function useTheme() {
  const [theme, setTheme] = useState("light");

  function getTheme() {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
  }

  useEffect(() => {
    getTheme();
  }, [localStorage.getItem("theme")]);

  return { theme, getTheme };
}
