import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { store } from "./app/store";
import { Provider } from "react-redux";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SocketProvider } from "./context/SocketProvider";
import { SocketIDProvider } from "./context/SocketIDProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <SocketIDProvider>
      <SocketProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </BrowserRouter>
      </SocketProvider>
    </SocketIDProvider>
  </Provider>
);
