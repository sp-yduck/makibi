import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { ObjectiveDetailsPage } from "./pages/ObjectiveDetailsPage";
import ProfilePage from "./pages/ProfilePage";
import { UserProvider } from "./context/User";
import LoginCallback from "./pages/LoginCallback";
import Hero from "./pages/Hero";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login/callback" element={<LoginCallback />} />
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Hero />} />
            <Route path=":userId/dashboard" element={<DashboardPage />} />
            <Route
              path=":userId/objective/:objectiveId"
              element={<ObjectiveDetailsPage />}
            />
            <Route path=":userId/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
