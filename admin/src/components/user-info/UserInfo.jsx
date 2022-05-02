import React from 'react'
import './user-info.scss'

const UserInfo = ({ user }) => {
    // const user = useSelector((state) => state.user.currentUser);
    return (
        <div className='user-info'>
            <div className="user-info__img">
                <img src={user.picture ? user.picture : `https://i.pravatar.cc/150?u=${user.email}`} alt="" />
            </div>
            <div className="user-info__name">
                <span>{user.username}</span>
            </div>
        </div>
    )
}

export default UserInfo
