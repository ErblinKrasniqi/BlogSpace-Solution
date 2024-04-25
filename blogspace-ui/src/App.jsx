import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Wrapper from "./shared/Wrapper";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Wrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;
