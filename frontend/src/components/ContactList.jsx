import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ContactList() {
  const [contacts, setContacts] = React.useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_URL}/api/v1/contact/get-contacts`,
          {},
          { withCredentials: true }
        );
        setContacts(response.data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div>
      {contacts.length === 0 ? (
          <div className="text-center mt-5">
            <h1>No contacts found</h1>
          </div>
        ) : null}
      <ul className="list bg-base-100 rounded-box shadow-md">
        {contacts.map((contact) => {
          return (
            <li
              onClick={async () => {
                try {
                  const response = await axios.get(
                    `${
                      import.meta.env.VITE_URL
                    }/api/v1/contact/get-current-contact`,
                    {
                      params: { contactId: contact._id },
                      withCredentials: true,
                    }
                  );
                  const contactData = response.data.data;
                  console.log(contactData);
                  navigate("/select-contact", { state: contactData });
                } catch (error) {
                  console.log(error);
                }
              }}
              key={contact._id}
              className="list-row">
              <div>
                <img
                  className="size-10 rounded-box"
                  src="https://img.daisyui.com/images/profile/demo/1@94.webp"
                />
              </div>
              <div>
                <div className="font-semibold">{contact.name}</div>
                <div className="text-xs uppercase font-semibold opacity-60">
                  {contact.phone_number}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ContactList;
