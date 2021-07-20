import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./components/scrollToTop";
import { Provider } from "./context";

ReactDOM.render(
    <React.StrictMode>
        <Provider>
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <ScrollToTop />
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

reportWebVitals();
