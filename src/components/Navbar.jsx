/* eslint-disable react/no-unescaped-entities */
import { BsShop } from "react-icons/bs";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { motion } from 'framer-motion';
import '../App.css'

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleMenu = () => {
    setIsOpen(prevState => !prevState)
  }

  const menuVariants = {
    initial: {
      y: '-100%',
      opacity: 0
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        type: "tween",
        ease: "easeInOut",
        duration: 0.4
      }
    },
    exit: {
      y: '-100%',
      opacity: 0,
      transition: {
        type: "tween",
        ease: "easeInOut",
        duration: 0.4
      }
    }
  };

  return (
    <div className="sticky top-0">
      <nav className="bg-slate-900 text-white flex items-center justify-between p-5 md:p-6">
        <div className="flex items-baseline ms-1 lg:ms-6">
            <i className="text-lg md:text-xl lg:text-2xl"><BsShop /></i>
            <NavLink to='/' className="shop-logo md:text-xl lg:text-2xl ms-2">IVISHOP</NavLink>
        </div>
        
        <div className="hidden md:flex">
            <NavLink to="/categories/men's clothing" className="nav-link md:me-6 lg:me-9">Men's Clothing</NavLink>
            <NavLink to="/categories/women's clothing" className="nav-link md:me-6 lg:me-9">Women's Clothing</NavLink>
            <NavLink to='/categories/electronics' className="nav-link md:me-6 lg:me-9">Electronic</NavLink>
            <NavLink to='/categories/jewelery' className="nav-link lg:me-4">Jewelery</NavLink>
        </div>

        <div className="md:hidden">
          <button className="text-2xl" onClick={toggleMenu}>
            <IoMenu />
          </button>

          <motion.div
            variants={menuVariants}
            initial='initial'
            animate={isOpen ? "animate" : "exit"}
            className="absolute left-0 top-0 bg-slate-900 w-full p-5"
          >
            <button className="text-2xl float-right" onClick={toggleMenu}>
              <IoClose/>
            </button>

            <motion.div className="flex flex-col mt-10 items-center justify-center">
              <NavLink to="/categories/men's clothing" className="nav-link my-3" onClick={toggleMenu}>
                Men's Clothing
              </NavLink>
              <NavLink to="/categories/women's clothing" className="nav-link my-3" onClick={toggleMenu}>
                Women's Clothing
              </NavLink>
              <NavLink to='/categories/electronics' className="nav-link my-3" onClick={toggleMenu}>
                Electronic
              </NavLink>
              <NavLink to='/categories/jewelery' className="nav-link my-3" onClick={toggleMenu}>
                Jewelery
              </NavLink>
            </motion.div>
          </motion.div>
        </div>
      </nav>  
    </div>
    
  )
}
