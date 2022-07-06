import "./App.css";
import {
  Routes,
  Route,
  BrowserRouter,
  Navigate,
  useNavigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddNews from "./pages/AddNews";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import News from "./pages/News";
import LandingPage from "./pages/LandingPage";
import PostedNewsItems from "./pages/PostedNewsItems";
import EditNews from "./pages/EditNews";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add"
            element={
              <ProtectedRoute>
                <AddNews />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:newsid"
            element={
              <ProtectedRoute>
                <EditNews />
              </ProtectedRoute>
            }
          />
          <Route
            path="/newsdesc/:newsid"
            element={
              <ProtectedRoute>
                <News />
              </ProtectedRoute>
            }
          />
          <Route
            path="/posted"
            element={
              <ProtectedRoute>
                <PostedNewsItems />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

export const ProtectedRoute = ({ children }) => {
  if (localStorage.getItem("user")) {
    return children;
  }

  return <Navigate to="/" />;
};
