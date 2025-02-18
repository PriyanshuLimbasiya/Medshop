import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./components/Signup";
import DashBoard from "./components/DashBoard";
import PreLoader from "./components/utils/PreLoader";
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return <PreLoader />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup isSignUp={false} />} />
        <Route path="/dash" element={<DashBoard />} />
        <Route path="/signup" element={<Signup isSignUp={true} />} />
        <Route path="/login" element={<Signup isSignUp={false} />} />
      </Routes>
    </Router>
  );
}

export default App;
