import "@/styles/globals.css";
import "@/styles/index.scss";
// import "../styles/component/layout/mintform.scss";
import "@/styles/mintform.css";
import "@rainbow-me/rainbowkit/styles.css";

import { wrapper } from "../redux/store";
import { getDefaultWallets, RainbowKitProvider, midnightTheme } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygonMumbai, goerli } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(
  [polygonMumbai, goerli],
  [
    alchemyProvider({ apiKey: "M6wTJ_1DsrJkSUE0qusDZO96oASJC8xS" }),
    publicProvider(),
  ]
);
const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors: connectors(chains),
  provider,
});

function App({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider theme={midnightTheme()} chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default wrapper.withRedux(App);
