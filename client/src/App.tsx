import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RootLayout from "./layouts/RootLayout";
import RegisterPage from "./pages/RegisterPage";
import MatchesPage from "./pages/MatchesPage";

const App = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/matches" element={<MatchesPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default App;
