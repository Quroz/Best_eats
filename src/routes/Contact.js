import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import contact from "../assets/contact.jpeg"


export const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_0q408lj', 'template_un7e2bs', form.current, 'qvm4etqb7Ot7d6B5o')
      .then((result) => {
          console.log(result.text);
          e.target.reset()
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <div className='min-h-screen w-full relative flex justify-center'>
        <form ref={form} onSubmit={sendEmail} className = "absolute w-[60%] mx-auto flex flex-col py-3 px-8 mt-16 gap-5 bg-black/50 rounded-md text-white">
            <h1 className='font-bold text-4xl text-center mt-4 text-white'>Contact us</h1>
            <label className='text-xl'>From:</label>
            <input type="text" name="user_name" className='py-2 rounded-md bg-white indent-1 text-black' placeholder = "From..."/>
            <label className='text-xl'>Email:</label>
            <input type="email" name="user_email" className='py-2 rounded-md bg-white indent-1 text-black' placeholder = "Enter your email..."/>
            <label className='text-xl'>Message:</label>
            <textarea name="message" className='min-h-[200px] indent-1 bg-white text-black rounded-md' placeholder = "Write a message..."/>
            <input type="submit" value="Send" className='w-[50%] mx-auto bg-orange-500 text-white hover:bg-orange-300 rounded-md border-none py-2 cursor-pointer'/>
        </form>
        <img alt = "/" src = {contact} className = "object-cover w-full h-full"/>
    </div>
  );
};

export default Contact