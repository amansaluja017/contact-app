import React, {useState, useId, useRef} from "react";
import Header from "./Header";
import {useForm} from "react-hook-form"
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function NewContact() {
  const nameId = useId();
  const emailId = useId();
  const phoneId = useId();
  const navigate = useNavigate();

  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  

  const [error, setError] = useState(null);

  const {register, handleSubmit} = useForm();

  const submit = async (data) => {
    setError('');
    try {
      const response = await axios.post(`${import.meta.env.VITE_URL}/api/v1/contact/create-contact`, data, {withCredentials: true});
      const contactData = response.data.data;
      console.log(response);
      navigate('/', {state: contactData});
    } catch (error) {
      console.error(error);
      setError(error);
    }
  }

  return (
    <div className="w-screen">
        <Header name="Add Contact" />
      <div className="flex flex-col p-4 gap-10">
        <form onSubmit={handleSubmit(submit)}>
          <div className="flex flex-col gap-2 mt-4">
            <label htmlFor={nameId}>Name</label>
            <input ref={nameRef} id={nameId} type="text" placeholder="Type here" className="input" required {...register('name', {required: true})} />
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <label htmlFor={emailId}>Email</label>
            <input ref={emailRef} id={emailId} type="email" placeholder="Type here" className="input" {...register('email')} />
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <label htmlFor={phoneId}>Phone Number</label>
            <input ref={phoneRef}  id={phoneId} type="number" placeholder="Type here" className="input" minLength='10' maxLength='10' pattern="/^(?:(?:\+91|0)?[6-9]\d{9})$/" required {...register('phone_number', {required: true, maxLength: 10, minLength: 10})}/>
          </div>

          {error && <p className='text-red-700 text-sm font-mono'>{error}</p>}

          <button type="submit" className="btn btn-soft mt-10 flex w-full">Add contact</button>
        </form>
      </div>
    </div>
  );
}

export default NewContact;
