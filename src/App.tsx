import { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DND from "./routes/DND/DND";
import Home from "./routes/Home/Home";
import KT from "./routes/KT/KT";
import { store } from "./store";

export default function App() {

  useEffect(() => {
    console.log("v1.0.6")
  }, [])

  return (
    <Provider store={store}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dnd" element={<DND />} />
          <Route path="/kt" element={<KT />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}