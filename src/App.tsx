import { Suspense, useState, useEffect } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import LandingPage from "./components/LandingPage";
import Auth from "./components/Auth";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import routes from "tempo-routes";

type AppState = "landing" | "auth" | "app";

function AppContent() {
  const { user, loading } = useAuth();
  const [appState, setAppState] = useState<AppState>("landing");

  useEffect(() => {
    if (!loading) {
      if (user) {
        setAppState("app");
      } else {
        setAppState("landing");
      }
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (appState === "auth") {
    return (
      <Auth
        onBack={() => setAppState("landing")}
        onSuccess={() => setAppState("app")}
      />
    );
  }

  if (appState === "landing" && !user) {
    return <LandingPage onGetStarted={() => setAppState("auth")} />;
  }

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
