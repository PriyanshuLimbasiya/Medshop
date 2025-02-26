import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./components/Signup";
import DashBoard from "./components/DashBoard";
import PreLoader from "./components/utils/PreLoader";
import ForgotPassword from "./components/ForgotPassword";
import MedicineList from "./components/Medicine/MedicineList";
import InventoryForm from "./components/Medicine/InventryForm";
import Layout from "./components/Layout"; // Import Layout
import PurchaseList from "./components/Purchase/PurchaseList";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 990);
  }, []);

  if (loading) {
    return <PreLoader />;
  }

  return (
    <Router>
      <Routes>

        <Route path="/" element={<Signup isSignUp={false} />} />
        <Route path="/signup" element={<Signup isSignUp={true} />} />
        <Route path="/login" element={<Signup isSignUp={false} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />


        <Route element={<Layout />}>
          <Route path="/dash" element={<DashBoard />} />
          <Route path="/medicinelist" element={<MedicineList />} />
          <Route path="/addmedicine" element={<InventoryForm isEditMode={false} />} />
          <Route path="/updatemed/:id" element={<InventoryForm isEditMode={true} />} />
          <Route path="/purchase" element={<PurchaseList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
