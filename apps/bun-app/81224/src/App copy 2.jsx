import { useState } from "react";
import "./App.css";
function App() {
  const [count, setCount] = useState(0);
  const inc = () => {
    setCount(() => count + 1);
    console.log(count);
  }
  return (
    <>
      <div className="card">
        <p>{count}</p>
        <button onClick={inc}>Click</button>
      </div>
    </>
  );
}

export default App;
