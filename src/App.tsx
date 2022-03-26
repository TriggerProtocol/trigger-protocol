import "./styles/globals.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { PortalPage } from "./pages/PortalPage";
import { ExplorePortalsPage } from "pages/ExplorePortalsPage";
import { Navbar } from "./Components/Navbar";
import { Footer } from "./Components/Footer";
import { PortalCard } from "./Components/PortalCard";

function App() {
  return (
    <Router>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="dev" element={<PortalCard />} />
          <Route path="/portal/:portalId" element={<PortalPage />} />
          <Route path="/explore-portals/" element={<ExplorePortalsPage />} />
        </Routes>
      </main>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
