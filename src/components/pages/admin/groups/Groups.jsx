import React from 'react'
import { Link } from "react-router-dom";
import { IoSearchCircle } from "react-icons/io5";
import useFetch from '../../../customHooks/useFetch';

function Groups() {

  const {getData} = useFetch(
    {
      url: "http://localhost:5000/groups",
      mode: 'GET'
    }
  );
  console.log(getData);
  

  return (
    <div className='admin_right_box'>
    <div className="admin_right_nav">
      
      <p><i>Guruhlar</i></p>
      <div className="search_bar">
        <input type="text" placeholder="Nomi..." />
        <IoSearchCircle fontSize={'35px'} />
        <input type="text" placeholder="Yo'nalishi..." />
      </div>
      <Link to={'/admin/addGroup'}><button className="button-27">Guruh yaratish</button></Link>
    </div>
    <div className="admin_right_table">

       <div className="table">
        <div className="thead">
          <div className="tr">
          <div className="th">№</div>
          <div className="th">Guruh nomi</div>
          <div className="th">Yo'nalishi</div>
          <div className="th">O'qituvchisi</div>
          <div className="th">Vaqti</div>
          </div>
        </div>
        <div className="tbody">
         {
          getData ? getData.map((item, index) => (
            <div className='tr' key={index}>
              <div className="td">{index + 1}</div>
              <div className="td">{item.name}</div>
              <div className="td">{item.direction}</div>
              <div className="td">{item.price}</div>
              <div className="td">{item.days}</div>
            </div>
          )) : <div className='tr'>
            <h2>Malumotlar yo'q</h2>
          </div>
         }
        </div>
       </div>

    </div>
  </div>
  )
}

export default Groups