import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "../redux/store";
import setupAxiosInterceptors from "../axios/index.jsx";
import ScrollToTop from "./components/NavBar/ScrollToTop.jsx";
setupAxiosInterceptors(Store);
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={Store}>
      <ScrollToTop />
      <App />
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>
);
