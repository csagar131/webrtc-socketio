import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { SocketProvider } from "./Context/SocketContext/index.tsx";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <SocketProvider>
    <Router>
      <App />
    </Router>
  </SocketProvider>
);
