import React from 'react';
import Modal from "./Model"
import { Formik,Form, Field } from 'formik';
import { addDoc, collection,doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { toast } from 'react-toastify';

const AddAndUpdateContact = ({isOpen,onClose,isUpdate,contact}) => {

    const addContact = async(contact)=>{
        try {
            const contactRef = collection(db,"contact");
            await addDoc(contactRef,contact);
            toast.success("Document successfully added!");
            onClose();

        } catch (error) {
            console.log(error);
        }
    }
    const upDateContact = async(contact,id)=>{
        try {
            const contactRef = doc(db,"contact",id);
            await updateDoc(contactRef,contact);
            toast.success("Document successfully updated!");
            onClose();

        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div>
     <Modal isOpen={isOpen} onClose={onClose}>

        <Formik
        initialValues={isUpdate?
            {
                name:contact.name,
                email:contact.email,
            }:{
            name:"",
            email:"",
        }}
        onSubmit={(values)=>{
            console.log(values);
            isUpdate? upDateContact(values,contact.id) :
            addContact(values);
        }}
        >
            <Form className='flex flex-col gap-4'>
                <div className='flex flex-col gap-1'>
                <label htmlFor="name">Name</label>
                <Field name="name" className="border h-10" />
                </div>
                <div className='flex flex-col gap-1'>
                <label htmlFor="email">Email</label>
                <Field type="email" name="email" className="border h-10"/>
                </div>
                <button className="bg-orange px-3 py-1.5 border self-end"    >{isUpdate? "Update" : "add"} contact</button>
            </Form>
        </Formik>
      
      </Modal>
    </div>
  )
}

export default AddAndUpdateContact