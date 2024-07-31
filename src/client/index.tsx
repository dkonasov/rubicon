import { createRoot } from "react-dom/client";
import { App } from "./components/app";
import { AppProviders } from "./components/app-providers";

const root = createRoot(document.getElementById("root")!);

root.render(
  <AppProviders>
    <App />
  </AppProviders>
);
