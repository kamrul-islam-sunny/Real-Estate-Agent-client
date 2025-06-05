"use client";
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import logo from '@/../public/asset/logo.svg'
import { Button } from '@/components/ui/button'
import { MdOutlineCancel } from 'react-icons/md';
import { IoMenu } from 'react-icons/io5';
import { usePathname } from 'next/navigation';

function Navbar() {

  const path = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const MobileNavLink: React.FC<{
    href: string;
    currentPath: string;
    children: React.ReactNode;
  }> = ({ href, currentPath, children }) => {
    const isActive = currentPath === href;
    return (
      <Link
        onClick={() => setIsMenuOpen(false)}
        href={href}
        className={`text-2xl transition-all duration-300 ${isActive
          ? "text-accent-gold font-semibold"
          : "text-dark-gray"
          }`}
      >
        {children}
      </Link>
    );
  };

  const NavLink: React.FC<{
    href: string;
    currentPath: string;
    children: React.ReactNode;
  }> = ({ href, currentPath, children }) => {
    const isActive = currentPath === href;
    return (
      <Link
        href={href}
        className={`relative font-normal text-lg px-1 py-1 transition-all duration-300 hover:text-turquoise ${isActive
            ? "text-accent-gold font-semibold"
            : "text-dark-gray"
          }`}
      >
        {children}
        {isActive && (
          <span className="absolute left-0 bottom-0 w-full h-[2px] bg-turquoise rounded-md transition-all duration-300"></span>
        )}
      </Link>
    );
  };


  return (
    <div className='px-[5%]'>

      <nav className='max-w-6xl mx-auto'>

        <div className="flex justify-between items-center ">
          {/* logo */}
          <div className="text-2xl font-bold relative z-50">
            <Image width={50} height={50} src={logo} alt='real-estate-agent-logo' />
          </div>

          {/* nav item */}
          <ul className=" space-x-8 font-nunito text-dark-gray sm:flex  hidden">
            <NavLink href="/home" currentPath={path}>Home</NavLink>
            <NavLink href="/properties" currentPath={path}>Properties</NavLink>
            <NavLink href="/about" currentPath={path}>About</NavLink>
          </ul>


          {/* right navItem */}
          <div className="sm:block hidden ">
            <Button variant={'custom'} >
              <Link href="#" className="text-lg font-nunito font-normal">Contact</Link>
            </Button>
          </div>


          {/* Mobile Toggle */}
          <div
            className="sm:hidden relative z-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <MdOutlineCancel className="text-3xl text-black cursor-pointer" />
            ) : (
              <IoMenu className="text-3xl text-black cursor-pointer" />
            )}
          </div>

        </div>

        <div
          className={`fixed sm:hidden inset-0 w-full h-screen bg-white z-40 text-lg duration-500 py-18 px-[5%] border border-red-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          <div className="flex flex-col gap-4">
            <MobileNavLink href="/home" currentPath={path}>Home</MobileNavLink>
            <div className="bg-accent-gold h-px w-full"></div>
            <MobileNavLink href="/Properties" currentPath={path}>Properties</MobileNavLink>
            <div className="bg-accent-gold h-px w-full"></div>
            <MobileNavLink href="/about" currentPath={path}>About</MobileNavLink>
            <div className="bg-accent-gold h-px w-full"></div>

          </div>
        </div>

      </nav >
    </div >
  )
}

export default Navbar