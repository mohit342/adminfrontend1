
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



function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className='main d-flex'>
        <div className='sidebarWrapper'>
          <Sidebar/>
        </div>
        <div className='content'>
          <Routes>
            <Route path="/" exact={true} element={<Dashboard />} />
            <Route path="/dashboard" exact={true} element={<Dashboard />} />
            <Route path="/addproduct" exact={true} element={<Addproduct/>} />
            <Route path="/productlist" exact={true} element={<ProductList/>} />
            <Route path="/productdetail" exact={true} element={<ProductDetail/>} />
            <Route path="/totalstocks" exact={true} element={<TotalStocks/>} />

          </Routes>

        </div>
      </div>

    </BrowserRouter>
  )
}

export default App;
