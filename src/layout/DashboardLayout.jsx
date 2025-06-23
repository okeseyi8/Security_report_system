import React, { Children } from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

const DashboardLayout = ({children}) => {
  return (
    <div className='flex'>
        <Sidebar className="fixed overflow-hidden"/>
        <div className='w-[20%] h-full'></div>
        <div className='w-[80%]'>
           <Outlet/>
        </div>
    </div>
  )
}

export default DashboardLayout