import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import axios from "axios";
import Swal from 'sweetalert2';
import parse from 'html-react-parser';
import { getToken } from "./services/authoriz";

function App() {
  const [listData, setListData] = useState([]);

  useEffect(() => {
    fetchListData();
  }, []);

  const fetchListData = () => {
    axios.get(`${process.env.REACT_APP_API}/read`)
      .then((response) => {
        setListData(response.data);
      })
      .catch((error) => {
        alert(error);
      })
  };

  const conFirmDelete = (slug) => {
    Swal.fire({
      title: 'ต้องการลบบทความนี้หรือไม่ ?',
      icon: 'warning',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteData(slug);
      }
    })
  };

  const deleteData = (slug) => {
    axios.delete(`${process.env.REACT_APP_API}/read/${slug}`)
      .then((response) => {
        Swal.fire("Deleted!", response.data.message, "success");
        fetchListData();
      }).catch((error) => {
        alert(error);
      });
  };


  return (
    <div className="container p-5">
      <Navbar />
      <div className="">
        {listData && listData.map((data, index) => (
          <div className="row" key={index} style={{ borderBottom: '1px solid silver' }}>
            <div className="col pt-3 pb-2">
              <a href={`/read/${data.slug}`}>
                <h2>{data.title}</h2>
              </a>
              <p>{parse(data.content.substring(0, 250))}</p>
              <p className="text-muted">ผู้เขียน: {data.author} เผยแพร่: {new Date(data.createdAt).toLocaleString()}</p>

              {getToken() && (
                <div>
                  <a href={`edit/${data.slug}`}
                    className="btn btn-warning">
                    แก้ไขบทความ
                  </a> &nbsp;
                  <button onClick={() => conFirmDelete(data.slug)}
                    className="btn btn-danger">
                    ลบบทความ
                  </button>
                </div>
              )}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
