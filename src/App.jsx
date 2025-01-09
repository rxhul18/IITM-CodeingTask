import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Product from "./components/Product";
import { useEffect, useState } from "react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Auth } from "@supabase/auth-ui-react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://vzxikxhahtpqyancakzw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6eGlreGhhaHRwcXlhbmNha3p3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY0MTIwNzgsImV4cCI6MjA1MTk4ODA3OH0._FrFrHsfQUneV3vt-0sbAHz6EYRa_DgVHzUtLINrzFo"
);

const App = () => {
  const [session, setSession] = useState(null);
  const [mailId, setMailId] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setMailId(session?.user?.email);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setMailId(session?.user?.email);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return (
      <div className="w-full">
        <div className="container max-w-3xl">
          <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-w-full min-h-full">
        <Navbar mail={mailId} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Product mail={mailId} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
