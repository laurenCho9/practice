import "./App.css";
import { useState } from "react";
import Todos from "./component/Todos";
import TodoList from "./component/TodoList";

function App() {
  return (
    <>
      <Todos />
      {/* <TodoList style={{ color: "red" }} /> */}
    </>
  );
}

export default App;
