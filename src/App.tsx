import { Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar/Narbar";
import { Content, Home, Write } from "./pages";

function App() {
  return (
    <div>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/write" element={<Write />} />
          <Route path="/content/:id" element={<Content />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
