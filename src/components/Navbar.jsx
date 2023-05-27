import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='p-4 border-b border-slate-700 flex gap-8' id='navbar'>
      <NavLink className='text-slate-400 hover:text-gray-300 font-medium' to="/">Home</NavLink>
      <NavLink className='text-slate-400 hover:text-gray-300 font-medium' to="/exercises">Exercises</NavLink>
    </div>
  )
}

export default Navbar