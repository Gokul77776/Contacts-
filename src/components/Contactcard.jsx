 import { deleteDoc, doc } from 'firebase/firestore';
import React, { useState } from 'react'
import { FaTrash } from 'react-icons/fa';
import { HiOutlineUserCircle } from 'react-icons/hi';
import { RiEditCircleLine } from 'react-icons/ri';
import { db } from '../config/firebase';
import useDisclouse from '../hooks/useDisclouse';
import AddAndUpdateContact from './AddAndUpdateContact';
import { toast } from 'react-toastify';
 
 
 const ContactCard = ({contact}) => {
     
    
    const {isOpen,onClose,onOpen} = useDisclouse();

    
    
     
 
    const deleteContact = async (id) => {
        try {
            await deleteDoc(doc(db, "contact", id));
            toast.success("Document successfully deleted!");
            
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    };

   return (
     <>
          <div className='flex justify-around items-center bg-yellow  rounded-lg '>
            <HiOutlineUserCircle className='text-orange text-3xl'/>
              <div >
                <h2 className='font-medium'>{contact.name}</h2>
                <p className='text-sm'>{contact.email}</p>
              </div>
              <div className='flex gap-3'>
                <RiEditCircleLine onClick={onOpen} className='cursor-pointer ' />
                <FaTrash onClick={()=>deleteContact(contact.id)} className='text-orange cursor-pointer'/>
              </div>
            </div>
            <AddAndUpdateContact contact={contact} isUpdate onClose={onClose} isOpen={isOpen}/>
     </>
   )
 }
 
 export default ContactCard;