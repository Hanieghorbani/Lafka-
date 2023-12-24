import React from 'react'

export default function HeaderSection({title,desc,topDesc,textWhite}) {
  return (
    <div className={`text-center space-y-10 mb-10 ${textWhite && 'text-white'}`}>
    <p className={` sm:text-xl md:text-2xl ${textWhite ? 'text-black' : 'text-primary'}`}>{topDesc}</p>
         <h2 className='font-[delbar] sm:text-[1.6rem] sm:text-center md:text-5xl lg:text-6xl'>{title}</h2>
        <p className={` text-xl ${textWhite ? 'text-white' : 'text-gray-600'}`}>{desc}</p>
    </div>
  )
}
