import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./components/Signup";
import OtpForm from "./components/OtpForm";
import DashBoard from "./components/DashBoard";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup isSignUp={false} />} />
        <Route path="/dash" element={<DashBoard />} />
        <Route path="/signup" element={<Signup isSignUp={true} />} />
        <Route path="/login" element={<Signup isSignUp={false} />} />
        <Route path="/verification" element={<OtpForm />} />


      </Routes>
    </Router>
  );
}

export default App;