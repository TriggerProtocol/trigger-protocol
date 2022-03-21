import "./styles/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./Components/Home";

function App() {
  return (
    <Router>
      {/* Navbar */}
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
      {/* Footer */}
    </Router>
  );
}

export default App;
