import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./Auth/private-route";
import { useAuth } from "./Auth/is-auth";
import Home from "./pages/Home";
import Wrapper from "./shared/Wrapper";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Detials from "./pages/Details";
import CreatePost from "./pages/admin/CreatePost";
import Dashboard from "./pages/admin/Dashboard";

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <BrowserRouter>
      <Wrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element={<Detials />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoute isAuthenticated={isLoggedIn} />}>
            <Route path="/create" element={<CreatePost />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;
