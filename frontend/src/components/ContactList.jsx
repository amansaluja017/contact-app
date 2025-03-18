import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const el = useRef();

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_URL}/api/v1/contact/get-contacts`,
          {},
          { withCredentials: true }
        );
        if (response.status === 200) {
          setContacts(response.data.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
    setSearchValue(el.current.value);
    const newSearchValue = contacts.filter((contact) => {
      return Object.values(contact)
        .join(" ")
        .toLowerCase()
        .includes(searchValue.toLowerCase());
    });
    setSearchResult(newSearchValue);
  }, [searchValue]);

  let value = contacts;

  if (searchValue.length < 1) {
    value = contacts;
  } else {
    value = searchResult;
  }

  return (
    <div>
      <div className="p-4">
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            ref={el}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            type="search"
            className="grow"
            placeholder="Search"
          />
          <kbd className="kbd kbd-sm">⌘</kbd>
          <kbd className="kbd kbd-sm">K</kbd>
        </label>
      </div>
      {!loading && contacts.length < 1 ? (
        <div className="text-center mt-15">
          <h1 className="text-lg">No contacts found</h1>
        </div>
      ) : null}
      {loading ? <div className="text-center">
        <div className="skeleton w-full h-screen"></div>
      </div> : null}
      <ul className="list bg-base-100 rounded-box shadow-md">
        {value.map((contact) => {
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
                  if (response.status === 200) {
                    const contactData = response.data.data;
                    navigate("/select-contact", { state: contactData });
                  }
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
