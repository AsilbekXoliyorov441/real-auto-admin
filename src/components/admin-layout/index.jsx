import React from 'react'
import Sidebar from '../sidebar'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div>
      <Sidebar/>
      <div>
        <main className='mt-[70px] ml-[20px] sm:ml-[270px]  mr-[20px]'>
          <Outlet/>
        </main>
      </div>
    </div>
  )
}

export default AdminLayout