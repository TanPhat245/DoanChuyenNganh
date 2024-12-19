import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Slidebar from './components/Slidebar'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Order from './pages/Order'
import Dashboard from './pages/Dashboard'
import CommentList from './pages/comments'
import Login from './components/Login'
import Up from './pages/upcomming'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UpdateProduct from './pages/Update'
import CategoryList from './pages/ListCategory'
import CategoryAdd from './pages/AddCategory'

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = '.000đ'

const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):'');

  useEffect(()=>{
    localStorage.setItem('token',token)
  },[token])
  

  return (
    <div className='bg-gray-100 min-h-screen'>
    <ToastContainer
    position="bottom-right"
    autoClose={1000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    transition: Bounce/>
    { token === "" ? <Login setToken={setToken} /> 
    : <>
      <Navbar setToken={setToken}/>
      <hr />
      <div className='flex w-full'>
          <Slidebar/>
          <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
            <Routes>
              <Route path='/add' element={<Add token={token}/>} />
              <Route path='/list' element={<List token={token}/>} />
              <Route path='/category/add' element={<CategoryAdd token={token}/>} />
              <Route path='/category/list' element={<CategoryList token={token}/>} />
              <Route path='/order' element={<Order token={token}/>} />
              <Route path='/' element={<Dashboard token={token}/>} />
              <Route path='/update/:id' element={<UpdateProduct token={token}/>} />
              <Route path='/up' element={<Up token={token}/>}/>
              <Route path='/comments' element={<CommentList token={token}/>}/>
            </Routes>
          </div>
      </div>
    </>
     }
    </div>
  )
}

export default App
