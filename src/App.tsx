import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DND from './components/DND/DND';
import Home from './components/Home/Home';

export default function App() {

  useEffect(() => {
    console.log("v0.0.1")
  }, [])

  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dnd" element={<DND />} />
      </Routes>
    </BrowserRouter>
  )
}