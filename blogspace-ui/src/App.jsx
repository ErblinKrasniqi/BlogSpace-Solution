import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Wrapper from "./shared/Wrapper";

function App() {
  return (
    <BrowserRouter>
      <Wrapper>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;
