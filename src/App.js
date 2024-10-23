import { useRef, useState } from "react";
import "antd/dist/reset.css";
import "./App.css";
import Form_login from "./Form_login.js";
import Table_ant from "./Table_ant.js";
import Padding from "./Padding.js";
import Student from "./Student.js";
import CRUD from "./CRUD.js";

function App() {
  return (
    <div className="App">
      <CRUD></CRUD>
    </div>
  );
}

export default App;
