import React from "react";
import ReactDOM from "react-dom/client";
import { createTheme, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

// Mantine Styles
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import "./index.css";

import App from "./app/App";

const theme = createTheme({
  primaryColor: "gold",
  colors: {
    gold: [
      "#fdfaf0",
      "#f9f1d8",
      "#f3e2ad",
      "#edd280",
      "#e7c253",
      "#e1b326",
      "#d4af37",
      "#b59325",
      "#957717",
      "#765c0c",
    ],
  },
  fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
  headings: {
    fontFamily: "'Cinzel', 'Playfair Display', serif",
    fontWeight: "700",
  },
  defaultRadius: "md",
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <Notifications position="top-right" zIndex={2000} />
      <App />
    </MantineProvider>
  </React.StrictMode>,
);
