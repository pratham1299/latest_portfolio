import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import CustomCursor from "./components/CustomCursor";
import Home from "./pages/Home";
import About from "./pages/About";
import Experience from "./pages/Experience";
import HeroConcepts from "./pages/HeroConcepts";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <CustomCursor />
      <div className="antialiased">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/hero-concepts" element={<HeroConcepts />} />
          <Route path="/hero-preview" element={<HeroConcepts />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
