
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BiSidebar } from 'react-icons/bi';
import Sidebar from './components/Sidebar';
import Addproduct from './pages/Addproduct/Addproduct';
import ProductList from './pages/ProductList/ProductList';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import TotalStocks from './pages/TotalStocks/TotalStocks';
import OrderPages from './pages/Orderpages/Orderpages';
import Alluser from './pages/User/Alluser/Alluser';
import {  createContext, useEffect, useState } from 'react';





 const MyContext =  createContext();

function App() {
  const [isToggleSidebar, setsToggleSidebar] = useState(false);

  const values = {
    isToggleSidebar,
    setsToggleSidebar
  }



  return (
    <BrowserRouter>
      <MyContext.Provider value={values}>
        <Header />
        <div className='main d-flex'>
          <div className={`sidebarWrapper ${isToggleSidebar===true ? 'toggle' : ''}`}>
            <Sidebar />
          </div>
          <div className={`content ${isToggleSidebar===true ? 'toggle' : ''}`}>
            <Routes>
              <Route path="/" exact={true} element={<Dashboard />} />
              <Route path="/dashboard" exact={true} element={<Dashboard />} />
              <Route path="/OrderPages" exact={true} element={<OrderPages />} />
              <Route path="/Alluser" exact={true} element={<Alluser />} />
              <Route path="/addproduct" exact={true} element={<Addproduct/>} />
            <Route path="/productlist" exact={true} element={<ProductList/>} />
            <Route path="/productdetail" exact={true} element={<ProductDetail/>} />
            <Route path="/totalstocks" exact={true} element={<TotalStocks/>} />              



            </Routes>
      </div>
      </div>
      </MyContext.Provider>

    </BrowserRouter>
  )
}

export default App;
export {MyContext}