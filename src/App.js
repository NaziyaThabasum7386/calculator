import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [solution, setSolution] = useState("");
  const [answer, setAnswer] = useState("");

  const handleButtonClick = (value) => {
    setSolution((solution) => solution + value);
  };

  const evaluateExpression = (expression) => {
    const tokens = expression.match(/\d+|\D/g);
    if (!tokens) throw new Error("Invalid expression");

    // Evaluate multiplication and division first
    let result = parseInt(tokens[0], 10);
    for (let i = 1; i < tokens.length; i += 2) {
      const operator = tokens[i];
      const operand = parseInt(tokens[i + 1], 10);
      if (operator === "*") {
        result *= operand;
      } else if (operator === "/") {
        if (operand === 0) throw new Error("Division by zero");
        result /= operand;
      }
    }

    // Evaluate addition and subtraction
    for (let i = 1; i < tokens.length; i += 2) {
      const operator = tokens[i];
      const operand = parseInt(tokens[i + 1], 10);
      if (operator === "+") {
        result += operand;
      } else if (operator === "-") {
        result -= operand;
      }
    }

    return result;
  };

  const calculateAnswer = () => {
    if (solution.trim() === "") {
      return setAnswer("Error");
    }

    try {
      if (solution.includes("/0")) {
        throw new Error("Division zero by zero");
      }
      const result = evaluateExpression(solution);
      setAnswer(result);
    } catch (error) {
      setAnswer("Error");
    }
  };

  const clear = () => {
    setSolution("");
    setAnswer("");
  };

  const buttonStyle = {
    position: "relative",
    top: "30px",
    background: "hwb(0 79% 25%)",
    color: "black",
    padding: "20px 20px",
    margin: "7px 7px",
    borderRadius: "5px",
    borderColor: "black",
    cursor: "pointer",
    fontSize: "16px",
  };

  return (
    <div className="App">
      <h1>React Calculator</h1>
      <input value={solution} readOnly />
      <h1>{answer}</h1>
      <button style={buttonStyle} onClick={() => handleButtonClick("7")}>
        7
      </button>
      <button style={buttonStyle} onClick={() => handleButtonClick("8")}>
        8
      </button>
      <button style={buttonStyle} onClick={() => handleButtonClick("9")}>
        9
      </button>
      <button style={buttonStyle} onClick={() => handleButtonClick("+")}>
        +
      </button>
      <br />
      <button style={buttonStyle} onClick={() => handleButtonClick("4")}>
        4
      </button>
      <button style={buttonStyle} onClick={() => handleButtonClick("5")}>
        5
      </button>
      <button style={buttonStyle} onClick={() => handleButtonClick("6")}>
        6
      </button>
      <button style={buttonStyle} onClick={() => handleButtonClick("-")}>
        -
      </button>
      <br />
      <button style={buttonStyle} onClick={() => handleButtonClick("1")}>
        1
      </button>
      <button style={buttonStyle} onClick={() => handleButtonClick("2")}>
        2
      </button>
      <button style={buttonStyle} onClick={() => handleButtonClick("3")}>
        3
      </button>
      <button style={buttonStyle} onClick={() => handleButtonClick("*")}>
        *
      </button>
      <br />
      <button style={buttonStyle} onClick={clear}>
        C
      </button>
      <button style={buttonStyle} onClick={() => handleButtonClick("0")}>
        0
      </button>
      <button style={buttonStyle} onClick={calculateAnswer}>
        =
      </button>
      <button style={buttonStyle} onClick={() => handleButtonClick("/")}>
        /
      </button>
    </div>
  );
}
