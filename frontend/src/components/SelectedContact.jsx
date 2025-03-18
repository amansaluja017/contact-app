import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserRoundPen, Trash2, ChevronLeft } from "lucide-react";
import axios from "axios";
import Header from "./Header";

function SelectedContact() {
  const { state } = useLocation();
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);
  const data = state || null;

  useEffect(() => {
    data ? setLoading(false) : setLoading(true);
    setContactData(data._id);
  }, [loading]);

  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-screen h-screen">
      <div onClick={() => {
        navigate(-1);
      }} className="absolute p-1 top-3 left-3 bg-black rounded-full">
        <ChevronLeft />
      </div>
      <div>
        <Header name="Contact Details" />
      </div>
      {loading ? (
        <div className="flex flex-col gap-4 items-center w-full mt-10">
          <div className="flex flex-col items-center gap-4">
            <div className="skeleton h-24 w-24 shrink-0 rounded-full"></div>
            <div className="flex flex-col items-center gap-4">
              <div className="skeleton h-4 w-20"></div>
              <div className="skeleton h-4 w-28"></div>
            </div>
          </div>
          <div className="skeleton h-32 w-3/4"></div>
        </div>
      ) : (
        <div className="text-center mt-10">
          <div className="avatar">
            <div className="w-24 rounded-full">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <div>
            <h1 className="font-semibold text-lg">{data.name}</h1>
            <p>{data.phone_number}</p>
            <p>{data.email}</p>
          </div>
        </div>
      )}

      <div className="flex mt-10 justify-end gap-5 mr-5">
        <div
          onClick={() => {
            navigate("/edit-contact", { state: data });
          }}>
          <UserRoundPen />
        </div>
        <div
          onClick={async () => {
            try {
              const response = await axios.delete(
                `${
                  import.meta.env.VITE_URL
                }/api/v1/contact/delete-contact/${contactData}`
              );
              if (response.status === 200) {
                navigate("/");
              }
            } catch (error) {
              console.log(error);
            }
          }}>
          <Trash2 />
        </div>
      </div>
      {/* <div className="">
        <h1>address: {data.state.address}</h1>
      </div> */}
    </div>
  );
}

export default SelectedContact;
