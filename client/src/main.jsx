// main Component: Entry point for the React application, setting up ReactDOM and wrapping the app with necessary providers.
// 
// Key Features:
// - Renders the App component into the root element.
// - Wraps the App component in a StrictMode for highlighting potential problems in an application.
// - Includes providers like Redux and Router for global state and routing.

// Function and Block Explanations:
// - ReactDOM.render: Mounts the React application into the DOM.
// - StrictMode: Wraps the app to enforce best practices and warn about potential issues.

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./Pages/store/store.js";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
