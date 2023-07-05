import { useEffect, useState } from "react";
import React from 'react'
import Navbar from "./Navbar";
import axios from "axios";
import Swal from 'sweetalert2';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getUser } from "../services/authoriz";

const Create = ({ history }) => {
    const [state, setState] = useState({
        title: "",
        author: getUser(),
    });
    const { title, author } = state;

    const [content, setContent] = useState('');

    const submitContent = (e) => {
        setContent(e);
    };

    const inputValue = name => e => {
        // console.log(name, '=', e.target.value);
        setState({ ...state, [name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('API ', process.env.REACT_APP_API);
        axios.post(`${process.env.REACT_APP_API}/create`, { title, content, author })
            .then(response => {
                Swal.fire(
                    'แจ้งเตือน',
                    'บันทึกข้อมูลบทความเรียบร้อย',
                    'success'
                );
                setState({ ...state, title: '', author: '' });
                setContent('');
            })
            .catch(error => {
                Swal.fire(
                    'แจ้งเตือน',
                    error.response.data.error,
                    'error'
                );
            });
    };

    useEffect(() => {
        // !getToken() && history.push('/');
    }, [])

    return (
        <div className='container p-5'>
            <Navbar />
            <h1>เขียนบทความ</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>ชื่อบทความ</label>
                    <input onChange={inputValue('title')} className='form-control' type='text' value={title} />
                </div>
                <div className="form-group">
                    <label>รายละเอียด</label>
                    <ReactQuill
                        value={content}
                        onChange={submitContent}
                        theme='snow'
                        placeholder='เขียนบทความของคุณ'
                    />
                    {/* <textarea onChange={inputValue('content')} className='form-control' type='text' value={content} /> */}
                </div>
                <div className="form-group">
                    <label>ผู้แต่ง</label>
                    <input onChange={inputValue('author')} className='form-control' type='text' value={author} />
                </div>
                <input className='btn btn-primary mt-2' type='submit' value='บันทึก' />
            </form>
        </div>
    )
}

export default Create;

