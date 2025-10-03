import { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DND from './components/DND/DND';
import Home from './components/Home/Home';
import { store } from "./store";

export default function App() {

  useEffect(() => {
    console.log("v1.0.1")
  }, [])

  return (
    <Provider store={store}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dnd" element={<DND />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}