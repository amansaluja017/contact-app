import React, { useEffect, useId, useState } from "react";
import Header from "./Header";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ChevronLeft } from "lucide-react";

function EditContact() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);
  const [contactData, setContactData] = useState("");

  const navigate = useNavigate();

  const nameId = useId();
  const emailId = useId();
  const phoneId = useId();
  const addressId = useId();

  const { state } = useLocation();
  const data = state || {};
  const contactId = data._id;

  useEffect(() => {
    setContactData(contactId);
  }, [contactId]);

  const submit = (data) => {
    setError(" ");
    (async () => {
      try {
        const response = await axios.patch(
          `${import.meta.env.VITE_URL}/api/v1/contact/update-contact`,
          {
            name: data.name,
            email: data.email,
            phone_number: data.phone_number,
            contactId: contactData,
          },
          { withCredentials: true }
        );
        navigate("/");
      } catch (error) {
        console.log(error);
        setError(error);
      }
    })();
  };

  return (
    <div>
      <div
        onClick={() => {
          navigate(-1);
        }}
        className="absolute p-1 top-3 left-3 bg-black rounded-full">
        <ChevronLeft />
      </div>
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
              className="input validator"
              minLength="1"
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
              className="input validator"
              {...register("email")}
            />
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <label htmlFor={phoneId}>Phone Number</label>
            <input
              id={phoneId}
              type="tel"
              defaultValue={data.phone_number}
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
              id={addressId}
              type="text"
              defaultValue={data.address}
              placeholder="Type here"
              className="input validator"
              required
              {...register("address")}
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
