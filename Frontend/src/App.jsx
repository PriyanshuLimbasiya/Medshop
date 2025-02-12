import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import DashBoard from "./components/Dashboard";
import Signup from "./components/Signup";


function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<DashBoard/>}/>
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/logout" element={<Logout />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword/:token" element={<ResetPassword />} /> */}
          
        </Routes>
    </Router>
  );
}

export default App;