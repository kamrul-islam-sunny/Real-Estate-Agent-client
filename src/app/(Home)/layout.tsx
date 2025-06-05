import Footer from '@/components/layout/Shared/Footer';
import Navbar from '@/components/layout/Shared/Navbar';
import React from 'react'

function HomeLayout({children}: {children: React.ReactNode}) {
  return (
    <div >
        <Navbar/>
        {children}
        <Footer/>
    </div>
  )
}

export default HomeLayout;