import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./ApolloProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/main.css";

// Import your components
import Layout from "./components/layouts/Layout";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import UserList from "./components/UserList";

const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <ToastContainer />
      <div className="app-container">
        <div className="main-content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="user-list" element={<UserList />} />
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  </ApolloProvider>
);

export default App;
