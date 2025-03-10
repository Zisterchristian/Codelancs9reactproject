import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [text, setText] = useState("");
  const [theme, setTheme] = useState("light");

  // Handle character count and letter density
  const handleChange = (event) => {
    setText(event.target.value);
  };

  const calculateLetterDensity = (input) => {
    const counts = {};
    for (let char of input.toLowerCase()) {
      if (char >= "a" && char <= "z") {
        counts[char] = (counts[char] || 0) + 1;
      }
    }
    return counts;
  };

  const letterDensity = calculateLetterDensity(text);

  // Handle theme switching
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  return (
    <div className={`App ${theme}`}>
      <textarea
        value={text}
        onChange={handleChange}
        placeholder="Type here..."
      />
      <p>Character Count: {text.length}</p>
      <div className="letterDensity">
        {Object.entries(letterDensity).map(([letter, count]) => (
          <div key={letter} className="bar">
            <span>{`${letter}: ${count}`}</span>
            <div
              className="barFill"
              style={{ width: `${count * 20}px` }}
            ></div>
          </div>
        ))}
      </div>
      <button onClick={toggleTheme}>
        Switch to {theme === "light" ? "Dark" : "Light"} Theme
      </button>
    </div>
  );
};

export default App;
