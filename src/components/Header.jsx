import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'
import Button from './UI/Button'
import { UserAuth } from '../contexts/ContextAPI'


const navs = [
  {
    name: 'home',
    to: '/',
    label: 'Home',
  },
  {
    name: 'about',
    to: '/about',
    label: 'About',
  },
  {
    name: 'contact',
    to: '/contact',
    label: 'Contact',
  },
]

const catButtons = [
  {
    name: 'requestADemo',
    to: '#',
    label: 'Request a demo',
    variant: 'secondary',
  },
  {
    name: 'signup',
    to: '/signup',
    label: 'Sign up',
    variant: 'primary',
  },
]

const Header = () => {

  const { userName } = UserAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation()
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  //==============================================|| To auto close the nav bar onChange of screen width and route change
  useEffect(() => {

    const handleCloseNavBar = () => {
      setIsMenuOpen(false)
    }

    window.addEventListener('resize', handleCloseNavBar);
    setIsMenuOpen(false);

    return () => window.removeEventListener('resize', handleCloseNavBar);

  }, [location])


  return (
    <>
      <header className="sticky top-0 bg-white-500 px-4 lg:px-8 text-black border-b z-50 bg-white">
        <div className=" flex items-center justify-between">
          {/* Logo */}
          <div className="text-xl font-bold py-3 lg:py-0">
            <Link to="/">Logo</Link>
          </div>

          {/* Burger Icon */}
          <button
            onClick={toggleMenu}
            className="lg:hidden flex items-center px text-black border-white hover:text-gray-300 hover:border-gray-300"
          >{isMenuOpen ?
            <XMarkIcon className='h-6 w-6 text-black' /> :
            <Bars3Icon className='h-6 w-6 text-black' />
            }
          </button>

          {/* Navigation Menu */}
          <nav className='hidden lg:flex h-full '>
            {navs && navs?.map(nav => (
              <Link key={nav?.name} to={nav?.to} className=" h-auto p-4 text-black hover:underline duration-300 text-base font-medium">
                {nav?.label}
              </Link>
            ))}
          </nav>

          {/* CTA buttons */}
          <div className='hidden lg:flex gap-4 '>
            {catButtons && catButtons?.map(button => (
              <Link className='my-2' key={button?.name} to={button?.to}>
                <Button
                  name={button?.label}
                  variant={button?.variant || 'primary'}
                />
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* nav menu in small screen */}
      {
        isMenuOpen &&
        <div
          className='lg:hidden fixed top-[52px] inset-y-0 z-50 transform 
          transition-transform duration-300 ease-in-out 
          w-full border-t p-4 bg-white overflow-y-auto'

        >
          <div className="h-full duration-0 flex flex-col justify-between">
            <div className='w-full'>
              <div className='flex flex-col gap-4 pb-8 border-b '>
                {catButtons && catButtons?.map(button => (
                  <Button
                    key={button?.label}
                    name={button?.label}
                    variant={button?.variant}
                  />
                ))}
              </div>
              <div className='flex flex-col pt-4'>

                {navs && navs?.map(nav => (
                  <Link key={nav?.name} to={nav?.to}
                    className='text-black text-sm font-medium'
                  >
                    <p className='hover:bg-gray-200 py-1.5 px-2 rounded-md duration-300 font-semibold text-sm'>
                      {nav?.name}
                    </p>
                  </Link>
                ))}

              </div>
            </div>
            <div className=" mt-10pt-8 sm:mt-10 lg:mt-12 text-center ">
              <p className="text-xs leading-5 text-gray-800 ">
                &copy; 2024 Your Company, Inc. All rights reserved
              </p>
            </div>
          </div>
        </div>
      }
    </>

  )
}

export default Header