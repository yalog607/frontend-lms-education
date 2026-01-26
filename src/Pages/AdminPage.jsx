import React from 'react'
import Sidebar from '../Components/Sidebar.jsx';
import toast from 'react-hot-toast';

const AdminPage = () => {
  const handleBtnClick = () => {
    toast.success("Hello from Admin Page!", {
      duration: 2000,
      position: 'top-center',
  })};
  return (
    <div className='flex flex-col md:flex-row h-screen gap-0'>
        <Sidebar />
        <div className='flex-1 bg-gray-50 overflow-auto'>
          <div className='p-8'>
            <h1 className='text-3xl font-bold text-gray-800 mb-4'>Chào mừng đến Dashboard</h1>
            <p className='text-gray-600'>Nội dung trang chính sẽ được thêm ở đây</p>
            <button className="btn bg-primary px-4 py-2 text-sm font-mono font-bold text-white" onClick={handleBtnClick}>Click me</button>
          </div>
        </div>
    </div>
  )
}

export default AdminPage;