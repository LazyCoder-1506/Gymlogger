import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='p-2 md:p-4 border-b border-slate-700 backdrop-blur-lg bg-gray-800 flex gap-4 md:gap-8' id='navbar'>
      <NavLink className='text-slate-400 hover:text-gray-300 font-medium' to="/">Home</NavLink>
      <NavLink className='text-slate-400 hover:text-gray-300 font-medium' to="/exercises">Exercises</NavLink>
    </div>
  )
}

export default Navbar