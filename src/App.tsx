import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { providers } from "ethers";
import { chain, Connector, defaultChains, WagmiProvider } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

import { ToastContainer } from "react-toastify";

//components
import { Home } from "./pages/Home";
import { PortalPage } from "./pages/PortalPage";
import { ExplorePortalsPage } from "pages/ExplorePortalsPage";
import { LiveStreamDashboard } from "pages/LiveStreamDashboard";
import { LiveStream } from "pages/LiveStream";
import { Navbar } from "./Components/Navbar";
import { Footer } from "./Components/Footer";
import { PortalCard } from "./Components/PortalCard";
import { Profile } from "pages/Profile";

// Styles
import "react-toastify/dist/ReactToastify.css";
import "./styles/globals.css";
import { providers } from "ethers";

const connector = new InjectedConnector();

const infuraId = process.env.NEXT_PUBLIC_INFURA_ID as string;
const alchemyId = "aXvxpjij8ntTqG-_x1H0yUEQcaq5iVUl";

// Pick chains
const chains = defaultChains;
const defaultChain = chain.polygonTestnetMumbai;

// Set up connectors
type ConnectorsConfig = { chainId?: number };
const connectors = ({ chainId }: ConnectorsConfig) => {
  const rpcUrl =
    chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ??
    defaultChain.rpcUrls[0];
  return [
    new InjectedConnector({ chains, options: { shimDisconnect: true } }),
    // new WalletConnectConnector({
    //   chains,
    //   options: {
    //     alchemyId,
    //     qrcode: true,
    //   },
    // }),
  ];
};

// Set up providers
type ProviderConfig = { chainId?: number; connector?: Connector };
const isChainSupported = (chainId?: number) =>
  chains.some((x) => x.id === chainId);

const provider = ({ chainId }: ProviderConfig) =>
  new providers.AlchemyProvider(chainId, alchemyId);
function App() {
  return (
    <WagmiProvider
      autoConnect={true}
      connectors={connectors}
      provider={provider}
    >
      <Router>
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/*" element={<Home />} />
            {/* <Route path="dev" element={<PortalCard />} /> */}
            <Route path="/portal/:portalId" element={<PortalPage />} />
            <Route path="/explore-portals/" element={<ExplorePortalsPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/streamer-dashboard/:id"
              element={<LiveStreamDashboard />}
            />{" "}
            <Route path="/stream/:id" element={<LiveStream />} />
          </Routes>
          <ToastContainer position="bottom-right" theme="dark" />
        </main>
        {/* <Footer /> */}
      </Router>
    </WagmiProvider>
  );
}

export default App;
