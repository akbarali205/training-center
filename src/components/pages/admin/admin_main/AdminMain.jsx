import React from 'react'
import './AdminMain.css'
import LeftMenu from '../left_menu/LeftMenu'
import {Outlet} from "react-router-dom";
import '../style/cabinet.css';

function AdminMain() {
  return (
    <div className='admin_main'>
        <LeftMenu />
        <div className="admin_right">
            <Outlet />
        </div>
    </div>
  )
}

export default AdminMain