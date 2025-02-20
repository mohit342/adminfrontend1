import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './components/Sidebar';
import Addproduct from './pages/Addproduct/Addproduct';
import ProductList from './pages/ProductList/ProductList';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import TotalStocks from './pages/TotalStocks/TotalStocks';
import OrderPages from './pages/Orderpages/Orderpages';
import Alluser from './pages/User/Alluser/Alluser';
import { createContext, useState, useContext,useEffect } from 'react';
import Login from './components/login/login';
import { AuthContext } from './context/AuthContext';
import Notifications from './pages/Notification/Notification';
import PaymentTransactions from './pages/Payment/PaymentTransactions';
import InvoiceBilling from './pages/InvoiceBilling/InvoiceBilling';
import Return from './pages/Return/Return';
import AddAttribute from './pages/AddAttribute/AddAttribute';
import AttributePage from './pages/AttributePage/AttributePage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import SalesReports from './pages/SalesReports/SalesReports';
import BestSellingProducts from './pages/BestSellingProducts/BestSellingProducts';


const MyContext = createContext();

function App() {
  const [isToggleSidebar, setsToggleSidebar] = useState(false);
  const { isAuthenticated } = useContext(AuthContext); // ✅ Now works since AuthProvider wraps App in main.jsx

  const values = {
    isToggleSidebar,
    setsToggleSidebar,
  };

  // ProtectedRoute component
  const ProtectedRoute = ({ children }) =>
    !isAuthenticated ? <Navigate to="/login" /> : children;

  return (
    <BrowserRouter>
      <MyContext.Provider value={values}>
        {isAuthenticated && <Header />}
        <div className="main d-flex">
          {isAuthenticated && (
            <div className={`sidebarWrapper ${isToggleSidebar ? 'toggle' : ''}`}>
              <Sidebar />
            </div>
          )}
          <div className={`content ${isToggleSidebar ? 'toggle' : ''}`}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/OrderPages" element={<ProtectedRoute><OrderPages /></ProtectedRoute>} />
              <Route path="/Alluser" element={<ProtectedRoute><Alluser /></ProtectedRoute>} />
              <Route path="/addproduct" element={<ProtectedRoute><Addproduct /></ProtectedRoute>} />
              <Route path="/productlist" element={<ProtectedRoute><ProductList /></ProtectedRoute>} />
              <Route path="/productdetail" element={<ProtectedRoute><ProductDetail /></ProtectedRoute>} />
              <Route path="/totalstocks" element={<ProtectedRoute><TotalStocks /></ProtectedRoute>} />
             
            
            <Route path="/notification"  element={<ProtectedRoute><Notifications/></ProtectedRoute>} />
            <Route path="/PaymentTransactions" element={<ProtectedRoute><PaymentTransactions/></ProtectedRoute>} />
            <Route path="/invoice"  element={<ProtectedRoute><InvoiceBilling/></ProtectedRoute>} />
            <Route path="/return"  element={<ProtectedRoute><Return/></ProtectedRoute>} />
            <Route path="/addattribute"  element={<ProtectedRoute><AddAttribute/></ProtectedRoute>} />
            <Route path="/attributepage"  element={<ProtectedRoute><AttributePage/></ProtectedRoute>} />
            {/* <Route path="/register"  element={<ProtectedRoute><SignupForm/></ProtectedRoute>} /> */}
            <Route path="/setting"  element={<ProtectedRoute><SettingsPage/></ProtectedRoute>} />
            <Route path="/salesreports"  element={<ProtectedRoute><SalesReports/></ProtectedRoute>} />
            <Route path="/bestselling"  element={<ProtectedRoute><BestSellingProducts/></ProtectedRoute>} />





            </Routes>
          </div>
        </div>
      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;
export { MyContext };
