import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import parse from 'html-react-parser';

const Single = (props) => {
    const [blog, setBlog] = useState([]);
    const [statusFetch, setStatusFetch] = useState(false);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, []);

    const fetchData = () => {
        const slug = props.match.params.slug;
        axios.get(`${process.env.REACT_APP_API}/read/${slug}`)
            .then((response) => {
                setBlog(response.data);
                setStatusFetch(true);
            })
            .catch((error) => {
                alert(error);
            })
    };

    return (
        <div className="container p-5">
            <Navbar />
            <div className="">
                <div className="row" style={{ borderBottom: '1px solid silver' }}>
                    <div className="col pt-3 pb-2">
                        {statusFetch &&
                            <div>
                                <h2>{blog.title}</h2>
                                <p>{parse(blog.content)}</p>
                                <p className="text-muted">ผู้เขียน: {blog.author} เผยแพร่: {new Date(blog.createdAt).toLocaleString()}</p>
                            </div>}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Single