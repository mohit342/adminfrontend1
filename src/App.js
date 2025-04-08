
import { BrowserRouter, Route, Routes,Navigate } from 'react-router-dom';
import './App.css';
import { createContext, useState, useContext } from 'react';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BiSidebar } from 'react-icons/bi';
import { AuthContext } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import Addproduct from './pages/Addproduct/Addproduct';
import ProductList from './pages/ProductList/ProductList';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import TotalStocks from './pages/TotalStocks/TotalStocks';
import OrderPages from './pages/Orderpages/Orderpages';

import Alluser from './pages/User/Alluser/Alluser';
import Notifications from './pages/Notification/Notification';
import PaymentTransactions from './pages/Payment/PaymentTransactions';
import InvoiceBilling from './pages/InvoiceBilling/InvoiceBilling';
import Return from './pages/Return/Return';
import AddAttribute from './pages/AddAttribute/AddAttribute';
import AttributePage from './pages/AttributePage/AttributePage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import SalesReports from './pages/SalesReports/SalesReports';
import BestSellingProducts from './pages/BestSellingProducts/BestSellingProducts';
import CustomerProfile from './pages/CustomerProfile/CustomerProfile';
import AdminLogin from './components/AdminLogin/AdminLogin';
import AddCategory from './pages/Category/AddCategory';
import CategoryList from './pages/Category/CategoryList';
import EditProduct from './pages/ProductList/EditProduct';
import CouponGenerator from './pages/Coupon/CouponGenerator';
import Superadmin from './pages/Coupon/Superadmin';
import SEGeneratedCoupons from './pages/Coupon/SEGeneratedCoupons';
import BulkPage from './pages/BulkPage/BulkPage';
import AdminHotDeal from './pages/Hotdeals/AdminHotDeal';
import AdminHotDealList from './pages/AdminHotDealList/AdminHotDealList';
import FeaturedCategories from './pages/FeaturedCategories/FeaturedCategories';

 const MyContext =  createContext();

function App() {
  const [isToggleSidebar, setsToggleSidebar] = useState(false);
  const { isAuthenticated, loading } = useContext(AuthContext);// Access loading state
  const values = {
    isToggleSidebar,
    setsToggleSidebar
  }

// ✅ ProtectedRoute with proper loading and auth check
const ProtectedRoute = ({ children }) => {
  if (loading) return <div>Loading...</div>; // Show loading while verifying token
  return isAuthenticated ? children : <Navigate to="/AdminLogin" />;
};

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
          <div className={`content ${isToggleSidebar===true ? 'toggle' : ''}`}>
            <Routes>
            <Route path="/AdminLogin" element={!isAuthenticated ? <AdminLogin /> : <Navigate to="/dashboard" />} />
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/OrderPages" element={<ProtectedRoute><OrderPages /></ProtectedRoute>} />
              <Route path="/Alluser" element={<ProtectedRoute><Alluser /></ProtectedRoute>} />
              <Route path="/addproduct" element={<ProtectedRoute><Addproduct /></ProtectedRoute>} />
              <Route path="/productlist" element={<ProtectedRoute><ProductList /></ProtectedRoute>} />
              <Route path="/productdetail/:id" element={<ProtectedRoute><ProductDetail /></ProtectedRoute>} />
              <Route path="/totalstocks" element={<ProtectedRoute><TotalStocks /></ProtectedRoute>} />
              <Route path="/notification" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
              <Route path="/PaymentTransactions" element={<ProtectedRoute><PaymentTransactions /></ProtectedRoute>} />
              <Route path="/invoice" element={<ProtectedRoute><InvoiceBilling /></ProtectedRoute>} />
              <Route path="/return" element={<ProtectedRoute><Return /></ProtectedRoute>} />
              <Route path="/addattribute" element={<ProtectedRoute><AddAttribute /></ProtectedRoute>} />
              <Route path="/attributepage" element={<ProtectedRoute><AttributePage /></ProtectedRoute>} />
              <Route path="/setting" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
              <Route path="/salesreports" element={<ProtectedRoute><SalesReports /></ProtectedRoute>} />
              <Route path="/bestselling" element={<ProtectedRoute><BestSellingProducts /></ProtectedRoute>} />
             <Route path="/customerprofile" exact={true} element={<ProtectedRoute><CustomerProfile/></ProtectedRoute>} />
             <Route path="/add-category" element={<ProtectedRoute><AddCategory/></ProtectedRoute>}/>
             <Route path="/category-list" element={<ProtectedRoute><CategoryList/></ProtectedRoute>}/>
             <Route path="/edit-product/:id" element={<ProtectedRoute><EditProduct /></ProtectedRoute>}/>
             <Route path="/couponschool" element={<ProtectedRoute><CouponGenerator/></ProtectedRoute>}/>
             <Route path="/couponSE" element={<ProtectedRoute><Superadmin/></ProtectedRoute>}/>
             <Route path="/totalcoupons" element={<ProtectedRoute><SEGeneratedCoupons/></ProtectedRoute>}/>
             <Route path="/BulkPage" element={<ProtectedRoute><BulkPage/></ProtectedRoute>}/>
             <Route path="/Hotdeals" element={<ProtectedRoute><AdminHotDeal/></ProtectedRoute>}/>
             <Route path="/AdminHotDealList" element={<ProtectedRoute><AdminHotDealList/></ProtectedRoute>}/>
             <Route path="/FeaturedCategories" element={<ProtectedRoute><FeaturedCategories/></ProtectedRoute>}/>



            </Routes>
          </div>
        </div>
      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;
export { MyContext };
