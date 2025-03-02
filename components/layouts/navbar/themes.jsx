"use client";
import { useState, useEffect } from "react";
import { SwatchIcon } from "@heroicons/react/24/outline";

export function Themes() {
  const [theme, setTheme] = useState("default", () => {
    const localData = localStorage.getItem("theme");
    return localData ? JSON.parse(localData) : "default";
  });

  const themeOptions = [
    {
      name: "System",
      value: "default",
    },
    {
      name: "Light",
      value: "light",
    },
    {
      name: "Dark",
      value: "dark",
    },
  ];

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  return (
    <details>
      <summary>
        <SwatchIcon className="size-5" /> Theme
      </summary>
      <ul>
        {themeOptions.map((option, index) => (
          <li key={index}>
            <input
              type="radio"
              name="theme"
              className="theme-controller btn btn-ghost btn-sm btn-block justify-start capitalize"
              aria-label={option.name}
              value={option.value}
              checked={theme === option.value}
              onChange={(event) => setTheme(event.target.value)}
            />
          </li>
        ))}
      </ul>
    </details>
  );
}
