import React, { useState, useId, useRef } from "react";
import Header from "./Header";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ChevronLeft } from "lucide-react";

function NewContact() {
  const nameId = useId();
  const emailId = useId();
  const phoneId = useId();
  const addressId = useId();
  const navigate = useNavigate();

  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();

  const [error, setError] = useState(null);

  const { register, handleSubmit } = useForm();

  const submit = async (data) => {
    setError("");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URL}/api/v1/contact/create-contact`,
        data,
        { withCredentials: true }
      );
      if (response.status === 200) {
        const contactData = response.data.data;
        navigate("/", { state: contactData });
      }
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  return (
    <div className="w-screen">
      <div onClick={() => {
        navigate(-1);
      }} className="absolute p-1 top-3 left-3 bg-black rounded-full">
        <ChevronLeft />
      </div>
      <Header name="Add Contact" />
      <div className="flex flex-col p-4 gap-10">
        <form onSubmit={handleSubmit(submit)}>
          <div className="flex flex-col gap-2 mt-4">
            <label htmlFor={nameId}>Name</label>
            <input
              ref={nameRef}
              id={nameId}
              type="text"
              placeholder="Type here"
              className="input validator"
              minLength="1"
              required
              {...register("name", { required: true })}
            />
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <label htmlFor={emailId}>Email</label>
            <input
              ref={emailRef}
              id={emailId}
              type="email"
              placeholder="Type here"
              className="input validator"
              {...register("email")}
            />
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <label htmlFor={phoneId}>Phone Number</label>
            <input
              id={phoneId}
              ref={phoneRef}
              type="tel"
              className="input validator tabular-nums"
              required
              placeholder="Type here"
              pattern="[0-9]*"
              minLength="10"
              maxLength="10"
              title="Must be 10 digits"
              {...register("phone_number", {
                required: true,
                maxLength: 10,
                minLength: 10,
              })}
            />
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <label htmlFor={addressId}>Address</label>
            <input
              ref={addressRef}
              id={addressId}
              type="text"
              placeholder="Type here"
              className="input validator"
              required
              {...register("address")}
            />
          </div>

          {error && <p className="text-red-700 text-sm font-mono">{error}</p>}

          <button type="submit" className="btn btn-soft mt-10 flex w-full">
            Add contact
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewContact;
