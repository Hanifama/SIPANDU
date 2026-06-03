import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/_shared/scrollTotopfunct";
import routes from "./routes";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        closeOnClick
        draggable
        pauseOnHover
      />
      <ScrollToTop />
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </>
  );
}
