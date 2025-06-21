import React from 'react'

type HeadingProps = {
  children: React.ReactNode;
};

function Heading({children}: HeadingProps) {
  return (
    <div className='text-3xl sm:text-[40px] font-normal font-anton text-dark-true '>
        {children}
    </div>
  )
}

export default Heading