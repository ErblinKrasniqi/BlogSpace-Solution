import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./Auth/private-route";
import { useAuth } from "./Auth/is-auth";
import Wrapper from "./shared/Wrapper";
import Loading from "./components/Loading";
import Users from "./pages/admin/Users";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Details = lazy(() => import("./pages/Details"));
const CreatePost = lazy(() => import("./pages/admin/CreatePost"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const EditPost = lazy(() => import("./pages/admin/EditPost"));

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <BrowserRouter>
      <Wrapper>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<PrivateRoute isAuthenticated={isLoggedIn} />}>
              <Route path="/create" element={<CreatePost />} />
              <Route path="/edit/:id" element={<EditPost />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
            </Route>
          </Routes>
        </Suspense>
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;
