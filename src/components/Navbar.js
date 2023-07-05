import React from 'react'
import { getToken, logout } from '../services/authoriz'
import { withRouter } from "react-router-dom";

const Navbar = ({ history }) => {
    return (
        <nav>
            <ul className='nav nav-tabs'>
                <li className='nav-item pr-3 pt-3 pb-3'>
                    <a className='nav-link' href='/'>หน้าแรก</a>
                </li>

                {getToken()
                    ? <>
                        <li className='nav-item pr-3 pt-3 pb-3'>
                            <a className='nav-link' href='/create'>เขียนบทความ</a>
                        </li>
                        <li className='nav-item  pr-3 pt-3 pb-3'>
                            <a onClick={() => logout(() => history.push('/'))} className='nav-link text-danger' href='/login'>ออกจากระบบ</a>
                        </li>
                    </>
                    : <li className='nav-item pr-3 pt-3 pb-3'>
                        <a className='nav-link text-success' href='/login'>เข้าสู่ระบบ</a>
                    </li>
                }
                {/* {getToken() &&
                    (<li className='nav-item pr-3 pt-3 pb-3'>
                        <a onClick={() => logout(() => history.push('/'))} className='nav-link ' href='/login'>ออกจากระบบ</a>
                    </li>)

                } */}

            </ul>
        </nav>
    )
}

export default withRouter(Navbar)