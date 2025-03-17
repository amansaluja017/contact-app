import React, { useEffect, useId, useState } from "react";
import Header from "./Header";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function EditContact() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);
  const [contactData, setContactData] = useState("");

  const navigate = useNavigate();

  const nameId = useId();
  const emailId = useId();
  const phoneId = useId();

  const { state } = useLocation();
  const data = state || {};
  const contactId = data._id;

  useEffect(() => {
    setContactData(contactId)
  },[contactId]);
  

  const submit = (data) => {
    setError(' ');
    (async () => {
        try {
            const response = await axios.patch(`${import.meta.env.VITE_URL}/api/v1/contact/update-contact`, 
                {name: data.name, email: data.email, phone_number: data.phone_number, contactId: contactData},
                {withCredentials: true}
            )
            navigate('/')
        } catch (error) {
            console.log(error);
            setError(error);
        }
    })();
  }

  return (
    <div>
      <div>
        <Header name="Edit Contact" />
      </div>
      <div>
        <form onSubmit={handleSubmit(submit)} className="p-4">
          <div className="flex flex-col gap-2 mt-4">
            <label htmlFor={nameId}>Name</label>
            <input
              id={nameId}
              type="text"
              defaultValue={data.name}
              placeholder="Type here"
              className="input"
              required
              {...register("name", { required: true })}
            />
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <label htmlFor={emailId}>Email</label>
            <input
              id={emailId}
              type="email"
              defaultValue={data.email}
              placeholder="Type here"
              className="input"
              {...register("email")}
            />
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <label htmlFor={phoneId}>Phone Number</label>
            <input
              id={phoneId}
              type="number"
              defaultValue={data.phone_number}
              placeholder="Type here"
              className="input"
              minLength="10"
              maxLength="10"
              pattern="/^(?:(?:\+91|0)?[6-9]\d{9})$/"
              required
              {...register("phone_number", {
                required: true,
                maxLength: 10,
                minLength: 10,
              })}
            />
          </div>

          {error && <p className="text-red-700 text-sm font-mono">{error}</p>}

          <button type="submit" className="btn btn-soft mt-10 flex w-full">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditContact;
