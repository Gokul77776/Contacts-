import React from 'react';
import { IoMdClose } from "react-icons/io";

const Model = ({onClose,isOpen,children}) => {
  return (
   <>
   {isOpen && <div className='  m-auto min-h-[200px] max-w-[80%] bg-white p-4'>
    <div className='flex justify-end'>
        <IoMdClose onClick={onClose} className='text-2xl' />
        </div>
        {children}
        </div>}

       
   </>
  )
}

export default Model