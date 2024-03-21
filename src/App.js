import React, { useState } from "react";
import { useSnackbar } from "notistack";
import "./App.css";


function precedence(op) {
  if (op === "+" || op === "-") {
    return 1;
  }
  if (op === "*" || op === "/") {
    return 2;
  }
  return 0;
}

function applyOp(a, b, op) {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return a / b;
    default:
      return 0;
  }
}

function evaluateExpression(tokens) {
  let values = [];
  let ops = [];
  let i = 0;

  while (i < tokens.length) {
    if (tokens[i] === " ") {
      i++;
      continue;
    } else if (tokens[i] === "(") {
      ops.push(tokens[i]);
    } else if (!isNaN(parseInt(tokens[i]))) {
      let val = 0;
      while (i < tokens.length && !isNaN(parseInt(tokens[i]))) {
        val = val * 10 + parseInt(tokens[i]);
        i++;
      }
      values.push(val);
      continue;
    } else if (tokens[i] === ")") {
      while (ops.length !== 0 && ops[ops.length - 1] !== "(") {
        let val2 = values.pop();
        let val1 = values.pop();
        let op = ops.pop();
        values.push(applyOp(val1, val2, op));
      }
      ops.pop();
    } else {
      while (
        ops.length !== 0 &&
        precedence(ops[ops.length - 1]) >= precedence(tokens[i])
      ) {
        let val2 = values.pop();
        let val1 = values.pop();
        let op = ops.pop();
        values.push(applyOp(val1, val2, op));
      }
      ops.push(tokens[i]);
    }
    i++;
  }

  while (ops.length !== 0) {
    let val2 = values.pop();
    let val1 = values.pop();
    let op = ops.pop();
    values.push(applyOp(val1, val2, op));
  }

  return values.pop();
}

function App() {
  const [solution, setSolution] = useState("");
  const [answer, setAnswer] = useState("");
  const { enqueueSnackbar } = useSnackbar(); // Access enqueueSnackbar function from useSnackbar hook

  const handleButtonClick = (value) => {
    setSolution((solution) => solution + value);
  };
  const calculateAnswer = () => {
    
    const tokens = solution.split(/(\+|\-|\*|\/|\(|\))/).filter((token) => token.trim() !== "");
  
    const result = evaluateExpression(tokens);
    if (solution.trim() === "") {
      return setAnswer("Error");
    }
  
    if (result === Infinity) {
      enqueueSnackbar("Infinity", { variant: "warning" }); // Display warning for division by zero
      setAnswer("Infinity");
      return;
    } 
  
    if (isNaN(result)) {
      enqueueSnackbar("NaN", { variant: "warning" }); // Display warning for incomplete expression
      setAnswer("NaN");
      return;
    }
  
  
    setAnswer(result);
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
      <input type="text" value={solution} readOnly />
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

export default App;
