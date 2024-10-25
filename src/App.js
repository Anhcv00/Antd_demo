import { BrowserRouter as Router } from "react-router-dom";
import "antd/dist/reset.css";
import "./App.css";
import AppRoutes from "./routers/AppRouter.js";

function App() {
  return (
    <div className="App">
      <Router>
        <AppRoutes />
      </Router>
    </div>
  );
}

export default App;
