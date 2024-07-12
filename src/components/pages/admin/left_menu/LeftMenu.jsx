import React from 'react'
import { NavLink } from 'react-router-dom'
import './LeftMenu.css'
import { FaUserEdit } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { FaUserGroup } from "react-icons/fa6";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";

function LeftMenu() {
  return (
    <div className='admin_left_side_bar'>
        <div className="admin_left_user">
          <div className="admin_avatar"><FaRegUserCircle /></div>
          <h3>Akbarali Sobirov</h3>
        </div>
        <ul className='left_side_pages_bar'>
            <NavLink to='/admin/lids' >
              <li><FaUserEdit /> <span>Talabgorlar</span></li>
            </NavLink>
            <NavLink to='/admin/pupils' >
              <li><PiStudentFill /> <span>O'quvchilar</span></li>
            </NavLink>
            <NavLink to='/admin/groups' >
              <li><FaUserGroup /> <span>Guruhlar</span></li>
            </NavLink>
            <NavLink to='/admin/teachers' >
              <li><FaChalkboardTeacher /> <span>O'qituvchilar</span></li>
            </NavLink>
        </ul>
    </div>
  )
}

export default LeftMenu