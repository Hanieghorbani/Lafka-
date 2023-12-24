import React from 'react'
import { FaStar } from "react-icons/fa";
export default function CommentBox({name,content,score}) {
  return (
    <div className='flex flex-col items-center gap-9'>
        <h5 className='text-3xl text-center'>،، {content} ،،</h5>
         <div className='flex text-secondary'>
         <FaStar />
         <FaStar />
         <FaStar />
         <FaStar />
         <FaStar />
         </div>
         <p>{name}</p>
    </div>
  )
}
