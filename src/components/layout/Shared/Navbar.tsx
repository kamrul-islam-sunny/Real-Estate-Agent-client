"use client";
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import logo from '@/../public/asset/logo.svg'
import { Button } from '@/components/ui/button'
import { MdOutlineCancel } from 'react-icons/md';
import { IoMenu } from 'react-icons/io5';
import { usePathname } from 'next/navigation';

function Navbar() {

  const path = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isMenuOpen]);

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
          <div className="text-2xl font-bold relative ">
            <Image width={50} height={50} src={logo} alt='real-estate-agent-logo' className='relative z-50' />
          </div>

          {/* nav item */}
          <ul className=" space-x-8 font-nunito text-dark-gray sm:flex  hidden">
            <NavLink href="/" currentPath={path}>Home</NavLink>
            <NavLink href="/properties" currentPath={path}>Properties</NavLink>
            <NavLink href="/about" currentPath={path}>About</NavLink>
            <NavLink href="/dashboard" currentPath={path}>Dashboard</NavLink>
          </ul>  
          


          {/* right navItem */}
          <div className="sm:block hidden ">
            <Button variant={'custom'} >
              <Link href="/contact" className="text-lg font-nunito font-normal">Contact</Link>
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
          className={`fixed top-0 left-0 w-full flex flex-col gap-4 bg-white pt-20 pb-5 z-40 px-[5%] transform duration-500 lg:hidden shadow ${isMenuOpen ? "translate-y-0" : "-translate-y-full"
            }`}
        >
          <div className="flex flex-col gap-4">
            <MobileNavLink href="/" currentPath={path}>Home</MobileNavLink>
            <div className="bg-accent-gold h-px w-full"></div>
            <MobileNavLink href="/Properties" currentPath={path}>Properties</MobileNavLink>
            <div className="bg-accent-gold h-px w-full"></div>
            <MobileNavLink href="/about" currentPath={path}>About</MobileNavLink>
            {/* <div className="bg-accent-gold h-px w-full"></div> */}

          </div>
        </div>

      </nav >
    </div >
  )
}

export default Navbar