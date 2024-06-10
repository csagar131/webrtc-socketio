import "./App.css";
import { Route, Routes } from "react-router-dom";
import Room from "./Pages/Room";
import Home from "./Pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/room/:id" element={<Room />} />
    </Routes>
  );
}

export default App;
