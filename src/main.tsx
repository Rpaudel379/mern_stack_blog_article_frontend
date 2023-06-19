import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/src/App";
import "@/src/index.css";
import { Provider } from "react-redux";
import { store } from "@states/store";
import Layout from "@components/Layout";
import("preline");

import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <Layout>
        <App />
      </Layout>
    </BrowserRouter>
  </Provider>
);
