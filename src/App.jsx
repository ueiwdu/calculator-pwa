
import { useState } from "react";
import "./App.css";

function App() {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");

  const handleClick = (value) => {
    if (value === "AC") {
      setDisplay("0");
      setExpression("");
      return;
    }

    if (value === "DEL") {
      setDisplay(display.length > 1 ? display.slice(0, -1) : "0");
      return;
    }

    if (value === "=") {
      try {
        const result = Function(
          `"use strict"; return (${display.replace(/×/g, "*").replace(/÷/g, "/")})`
        )();

        if (!Number.isFinite(result)) throw new Error();

        setExpression(display + " =");
        setDisplay(String(Number(result.toFixed(10))));
      } catch {
        setDisplay("Error");
      }
      return;
    }

    if (display === "Error") setDisplay("0");

    setDisplay((prev) =>
      prev === "0" || prev === "Error" ? value : prev + value
    );
  };

  const buttons = [
    "AC", "DEL", "%", "÷",
    "7", "8", "9", "×",
    "4", "5", "6", "-",
    "1", "2", "3", "+",
    "0", ".", "="
  ];

  return (
    <div className="container">
      <div className="calculator">
        <div className="screen">
          <p>{expression}</p>
          <h1>{display}</h1>
        </div>

        <div className="buttons">
          {buttons.map((btn) => (
            <button
              key={btn}
              onClick={() => handleClick(btn)}
              className={
                ["÷", "×", "-", "+", "="].includes(btn)
                  ? "operator"
                  : ["AC", "DEL", "%"].includes(btn)
                  ? "special"
                  : ""
              }
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
