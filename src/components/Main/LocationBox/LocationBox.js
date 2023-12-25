import React from 'react'

export default function LocationBox({name,city}) {
  return (
    <div className='text-zinc-400 text-sm'>
        <h1 className='font-bold mb-3 text-base'>{name}</h1>
         <ul className=' space-y-3'>
            <li >سطح 2</li>
            <li>{city}</li>
            <li>همبرگر لافکا</li>
            <li className='font-[faNum] text-info'>02110003432</li>
            <li>روزانه از 6.30 صبح – 9.30 شب باز است</li>
         </ul>
    </div>
  )
}
