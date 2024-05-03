import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import PrivateRoute from "./utils/PrivateRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/signin" element={<Login />} />

            <Route element={<PrivateRoute />}>
              <Route path="/*" element={<Dashboard />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
