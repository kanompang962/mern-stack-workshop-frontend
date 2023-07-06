import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import axios from "axios";
import Swal from 'sweetalert2';
import { authenticate, getToken } from '../services/authoriz';
import { withRouter } from "react-router-dom";

const Login = ({ history }) => {
    const [state, setState] = useState({
        username: '',
        password: '',
    });

    const { username, password } = state;

    const inputValue = name => e => {
        // console.log(name, '=', e.target.value);
        setState({ ...state, [name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_API}/login`, { username, password })
            .then((response) => {
                authenticate(response, () => window.location.href = '/');
                // history.push("/create")
            }).catch((error) => {
                Swal.fire(
                    'แจ้งเตือน',
                    error.response.data.error,
                    'error'
                );
            })
    };

    useEffect(() => {
        getToken() && history.push('/');
        // eslint-disable-next-line
    }, [])

    return (
        <div className='container p-5'>
            <Navbar />
            {/* {JSON.stringify(username + ' : ' + password)} */}
            <h1>เข้าสู่ระบบ | Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>ชื่อผู้ใช้</label>
                    <input
                        onChange={inputValue('username')}
                        className='form-control'
                        type='text'
                        value={username} />
                </div>
                <div className="form-group">
                    <label>รหัสผ่าน</label>
                    <input
                        onChange={inputValue('password')}
                        className='form-control'
                        type='password'
                        value={password} />
                </div>
                <input className='btn btn-primary mt-2' type='submit' value='เข้าสู่ระบบ' />
            </form>
        </div>
    )
}

export default withRouter(Login);