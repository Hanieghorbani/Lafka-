import React from 'react'

export default function HeaderSection({title,desc}) {
  return (
    <div className='text-center space-y-10 md:mb-10'>
         <h2 className='font-[delbar] sm:text-3xl sm:text-center md:text-5xl lg:text-6xl'>{title}</h2>
        <p className='text-gray-700 text-xl'>{desc}</p>
    </div>
  )
}
