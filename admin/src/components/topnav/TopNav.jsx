import React from 'react'
import './topnav.scss'
import UserInfo from '../user-info/UserInfo'
import { useSelector } from 'react-redux'


const TopNav = () => {
    const openSidebar = () => {
        document.body.classList.add('sidebar-open')
    }
    const currentUser = useSelector((state) => state.user.currentUser);
    return (
        <div className='topnav'>
            <UserInfo user={currentUser?.user} />
            <div className="sidebar-toggle" onClick={openSidebar}>
                <i className='bx bx-menu-alt-right'></i>
            </div>
        </div>
    )
}

export default TopNav
