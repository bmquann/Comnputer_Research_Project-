import './assets/libs/boxicons-2.1.1/css/boxicons.min.css'
import './scss/App.scss'
import { BrowserRouter, Routes, Route  } from 'react-router-dom'
import Blank from './pages/Blank'
import Dashboard from './pages/Dashboard'
import MainLayout from './layout/MainLayout'
import Login from './pages/login/Login'
import { useSelector } from 'react-redux'
import UserList from './pages/userList/UserList'
import User from './pages/user/User'
import ProductList from './pages/productList/ProductList'
import Product from './pages/product/Product'
import Orders from './pages/Orders/Orders'
import NewProduct from './pages/newProduct/NewProduct'


function App() {
    const admin = useSelector((state) => state.user.isAdmin);
    return (
        <BrowserRouter>
            <Routes>
                
            
                {/* <Route path="/user/:userId" element={<User />}></Route> */}
                {admin ? <Route path="/"  element={<MainLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="products" element={<ProductList />} />
                    <Route path="customers" element={<UserList />} />
                    <Route path="settings" element={<Blank />} />
                    <Route path="stats" element={<Blank />} />
                    <Route path="user/:userId" element={<User />}></Route>
                    <Route path="product/:productId" element={<Product />}></Route>
                    <Route path="newproduct" element={<NewProduct />}></Route>
                </Route> : <Route path="/" element={<Login />}></Route>}

            </Routes>
        </BrowserRouter>
    )
}

export default App
