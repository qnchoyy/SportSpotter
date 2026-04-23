import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RootLayout from "./layouts/RootLayout";
import RegisterPage from "./pages/RegisterPage";
import MatchesPage from "./pages/MatchesPage";
import MatchDetailsPage from "./pages/MatchDetailsPage";
import CreateMatchPage from "./pages/CreateMatchPage";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/matches" element={<MatchesPage />} />
        <Route path="/matches/create" element={<CreateMatchPage />} />
        <Route path="/matches/:id" element={<MatchDetailsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default App;
