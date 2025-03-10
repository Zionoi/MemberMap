// App.js (예시)
import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import AppRouter from "./routes/Router";

function App() {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ marginLeft: "220px", padding: "20px", width: "100%" }}>
          <AppRouter />
        </div>
      </div>
    </Router>
  );
}

export default App;
