import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function SideBar({showSideBar}) {
  const location = useLocation();
  const menuItems = [
    {
      title: 'Home',
      path: '/',
    },
    {
      title: 'Posted',
      path: '/posted',
    },
    {
      title: 'Add',
      path: '/add',
    },
    {
      title: 'Profile',
      path: '/profile',
    },
    {
      title: 'Logout',
      path: '/logout',
    },
  ]
  return (
    <div className={`transition-all duration-300 bg-primary h-screen flex flex-col overflow-hidden ${showSideBar?'w-60':'w-0'}`}>
      <div>
        <h1 className='text-3xl font-bold mt-10 ml-10 text-gray-200'>NewsApp</h1>
      </div>
      <div className='flex flex-col font-bold mt-20'>
        {menuItems.map((item) => {
          return (<Link to={`${item.path}`} 
          className={`text-gray-400 pl-10 py-5  hover:bg-gray-50 hover:text-gray-700
            ${location.pathname.includes(item.path) && 'bg-[#145c2aaf] text-yellow-200 font-bold'}`
          }>
          {item.title}
          </Link>);
        })}
      </div>
    </div>
  )
}

export default SideBar