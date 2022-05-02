import React, { useEffect } from 'react'
import './main-layout.scss'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/sidebar/Sidebar'
import TopNav from '../components/topnav/TopNav'
import { getAllUsers, getListOrders, getStats } from '../redux/apiCalls'
import { useDispatch } from 'react-redux'

const MainLayout = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        getAllUsers(dispatch)
        getListOrders(dispatch);
      }, [dispatch]);
    return (
        <>
            <Sidebar />
            <div className="main">
                <div className="main__content">
                    <TopNav />
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default MainLayout
