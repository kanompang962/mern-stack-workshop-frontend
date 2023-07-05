import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios';
import Swal from 'sweetalert2';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Edit = (props) => {
    const [state, setState] = useState({
        title: "",
        author: "",
        slug: "",
    });

    const { title, author, slug } = state;

    const [content, setContent] = useState('');

    const submitContent = (e) => {
        setContent(e);
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, []);

    const fetchData = () => {
        const slug = props.match.params.slug;
        axios.get(`${process.env.REACT_APP_API}/read/${slug}`)
            .then((response) => {
                const { title, author, slug } = response.data;
                setState({ ...state, title, author, slug });
                setContent(response.data.content);
            })
            .catch((error) => {
                alert(error);
            })
    };

    const inputValue = name => e => {
        // console.log(name, '=', e.target.value);
        setState({ ...state, [name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`${process.env.REACT_APP_API}/read/${slug}`, { title, content, author })

            .then(response => {
                Swal.fire(
                    'แจ้งเตือน',
                    'บันทึกข้อมูลบทความเรียบร้อย',
                    'success'
                );
                const { title, content, author, slug } = response.data;
                setState({ title, author, slug });
                setContent(content);
            })
            .catch(error => {
                Swal.fire(
                    'แจ้งเตือน',
                    error.response.data.error,
                    'error'
                );
            });
    };

    return (
        <div className='container p-5'>
            <Navbar />
            <h1>แก้ไขบทความ</h1>
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
                <input className='btn btn-primary mt-2' type='submit' value='อัพเดท' />
            </form>
        </div>
    )
}

export default Edit