 import React, { useEffect, useState } from 'react'
 import Navbar from './components/Navbar'
 import { MdContentPasteSearch } from "react-icons/md";
 import { FaPlusCircle } from "react-icons/fa";
import { collection , getDocs, onSnapshot } from 'firebase/firestore';
import  {db} from "./config/firebase";
import Contactcard from "./components/Contactcard";
import AddAndUpdateContact from './components/AddAndUpdateContact';
import useDisclouse from './hooks/useDisclouse';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 

 const App = () => {

    const [contacts,setContact] = useState([]);

    const {isOpen,onClose,onOpen} = useDisclouse();
    
     

    useEffect(()=>{
      const getContact = async()=>{
        try{
            const contactsRef =  collection(db,"contact");
            const contactsSnapshot = await getDocs(contactsRef);

            onSnapshot(contactsRef,(snapshot)=>{
              const contactLists = snapshot.docs.map((doc)=>{
                return {
                  id: doc.id,
                  ...doc.data(),
                }
              });
              setContact(contactLists)
              return contactLists
            });

            
        }
        catch(err){
            console.log(err);
        }
      }
      getContact();
    },[]);


    const filterContact = (e)=>{
      const value = e.target.value;
      const contactsRef =  collection(db,"contact");

      onSnapshot(contactsRef,(snapshot)=>{
        const contactLists = snapshot.docs.map((doc)=>{
          return {
            id: doc.id,
            ...doc.data(),
          }
        });

        const filteredContacts = contactLists.filter((contact)=> contact.name.toLowerCase().includes(value.toLowerCase()));
        setContact(filteredContacts);
        return filteredContacts
      });
    }




   return (
    <>
   

     <div className='mx-auto max-w-[370px]' >
      <Navbar/>
      <div className="flex relative items-center gap-3">
        <MdContentPasteSearch className="text-white text-3xl absolute"/>
        <input type="text" placeholder='Search Contact' onChange={filterContact} className="bg-transparent rounded-md border border-white  h-10 flex-grow pl-9 text-white" />
        <div>
          <FaPlusCircle onClick={onOpen} className='text-white text-3xl cursor-pointer'/>
        </div>
      </div>
      
      <div className='  mt-3 flex flex-col gap-3 '>
        {contacts.map((contact)=> (
          
          <Contactcard  key={contact.id} contact={contact}  />

        
         
        ))}
        
      </div>
     </div>
      <AddAndUpdateContact onClose={onClose} isOpen={isOpen}/>
      <ToastContainer position='bottom-center'/>
     </>
   )
 }
 
 export default App;