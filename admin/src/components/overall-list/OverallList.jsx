import React from 'react'
import './overall-list.scss'
import { data } from '../../constants'

const icons = [
    <i className='bx bx-receipt'></i>,
    <i className='bx bx-user'></i>,
    <i className='bx bx-cube'></i>,
    <i className='bx bx-dollar'></i>
]

const OverallList = (props) => {
    return (
        <ul className='overall-list'>
                <li className="overall-list__item" key={`overall`}>
                         <div className="overall-list__item__icon">
                            {icons[3]}
                        </div>
                        <div className="overall-list__item__info">
                            <div className="title">
                                {Math.round(props.sum * 100) / 100}
                          </div>
                             <span>Totals of Revenue</span>
                        </div>
                    </li>
                <li className="overall-list__item" key={`overall`}>
                         <div className="overall-list__item__icon">
                            {icons[2]}
                        </div>
                        <div className="overall-list__item__info">
                            <div className="title">
                                {props.quantity}
                          </div>
                             <span>Totals of Orders</span>
                        </div>
                    </li>
                    
            
        </ul>
    )
}

export default OverallList
