import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Wrapper from "./shared/Wrapper";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Detials from "./pages/Details";

function App() {
  return (
    <BrowserRouter>
      <Wrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element={<Detials />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;
