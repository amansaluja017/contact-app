import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserRoundPen, Trash2 } from "lucide-react";
import axios from "axios";
import Header from "./Header";

function SelectedContact() {
  const { state } = useLocation();
  const [contactData, setContactData] = useState(null);
  const data = state || null;

  useEffect(() => {
    setContactData(data._id);
  })

  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-screen h-screen">
      <div>
        <Header name="Contact Details" />
      </div>
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

      <div className="flex mt-10 justify-end gap-5 mr-5">
        <div
          onClick={() => {
            navigate("/edit-contact", { state: data });
          }}>
          <UserRoundPen />
        </div>
        <div onClick={async () => {
            try {
                const response = await axios.delete(`${import.meta.env.VITE_URL}/api/v1/contact/delete-contact/${contactData}`);
                if(response.status === 200) {
                    navigate("/")
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
