import React from 'react'
import { Link } from 'react-router-dom'
export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center mt-20 container-primary'>
        <h1 className='font-bold text-3xl text-gray-600 text-center'>صفحه ای که میخواستی پیدا نشد!</h1>
        <img src="/imgs/404.jpg" alt="404" />
        <Link to={'/'} className='btn bg-info'>بازگشت به صفحه اصلی</Link>
    </div>
  )
}
