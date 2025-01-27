import React from 'react'
import Sidebar from '../sidebar'
import { Outlet } from 'react-router-dom'
import Navbar from '../navbar'

const AdminLayout = () => {
  return (
    <div>
      <Sidebar/>
      <div>
        <Navbar/>
        <main className=' mt-[200px] ml-[300px]'>
          <Outlet/>
        </main>
      </div>
    </div>
  )
}

export default AdminLayout