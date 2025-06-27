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

  // const MobileNavLink: React.FC<{
  //   href: string;
  //   currentPath: string;
  //   children: React.ReactNode;
  // }> = ({ href, currentPath, children }) => {
  //   const isActive = currentPath === href;
  //   return (
  //     <Link
  //       onClick={() => setIsMenuOpen(false)}
  //       href={href}
  //       className={`text-2xl transition-all duration-300 ${isActive
  //         ? "text-accent-gold font-semibold"
  //         : "text-dark-gray"
  //         }`}
  //     >
  //       {children}
  //     </Link>
  //   );
  // };

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
          ? "text-accent-gold font-medium"
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
    <nav>
      {/* Mobile Overlay Only */}
      {/* {
        isMenuOpen && (
          <div
            className="sm:hidden fixed inset-0 bg-black/40 z-20 transition-opacity duration-300"
            onClick={() => setIsMenuOpen(false)}
          ></div>
        )
      } */}

      <div className="px-[5%] bg-white relative z-50">
        <div className="max-w-screen-xl mx-auto  bg-white relative z-50">
          {/* navbar */}
          <div className="flex justify-between items-center gap-5 py-5       bg-white relative z-50">
            <div className="relative z-50">
              {/* logo */}
              <Image width={50} height={50} src={logo} alt='real-estate-agent-logo' className='' />
            </div>
            <div className="hidden sm:flex gap-5 mt-2 text-zinc-600 font-inter">
              <NavLink href="/" currentPath={path}>Home</NavLink>
              <NavLink href="/properties" currentPath={path}>Properties</NavLink>
              <NavLink href="/about" currentPath={path}>About</NavLink>
              <NavLink href="/dashboard" currentPath={path}>Dashboard</NavLink>
            </div>


            {/* right navItem */}
            <div className="sm:block hidden ">
              <Button variant={'custom'} >
                <Link href="#" className="text-lg font-nunito font-normal">Contact</Link>
              </Button>
            </div>

            <div
              className="cursor-pointer relative z-50 sm:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <IoMenu size={28} /> : <MdOutlineCancel size={28} />}
            </div>
          </div>

          {/* with mobile navbar */}
          <div
            className={`fixed top-0 left-0 w-full flex flex-col gap-4 bg-white pt-20 pb-5 z-40 px-[5%] transform duration-500 font-inter lg:hidden shadow ${isMenuOpen ? "translate-y-10" : "-translate-y-full"
              }`}
          >
            <NavLink href="/" currentPath={path}>Home</NavLink>
            <NavLink href="/properties" currentPath={path}>Properties</NavLink>
            <NavLink href="/about" currentPath={path}>About</NavLink>
            <NavLink href="/dashboard" currentPath={path}>Dashboard</NavLink>
          </div>
        </div>
      </div>

    </nav >
  )
}

export default Navbar


