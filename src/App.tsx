import "./styles/globals.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { PortalPage } from "./pages/PortalPage";
import { ExplorePortalsPage } from "pages/ExplorePortalsPage";
import { Navbar } from "./Components/Navbar";
import { Footer } from "./Components/Footer";
import { PortalCard } from "./Components/PortalCard";
import { providers } from "ethers";
import { WagmiProvider } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
const connector = new InjectedConnector();

function App() {
  return (
    <WagmiProvider autoConnect={true} connectors={[connector]}>
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
    </WagmiProvider>
  );
}

export default App;
