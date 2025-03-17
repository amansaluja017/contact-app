import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import ContactList from "./components/ContactList.jsx";
import Home from "./components/Home.jsx";
import NewContact from "./components/NewContact.jsx";
import SelectedContact from "./components/SelectedContact.jsx";
import EditContact from "./components/EditContact.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<ContactList />} />
        <Route path="/add-contact" element={<NewContact />} />
        <Route path="/select-contact" element={<SelectedContact />} />
        <Route path="/edit-contact" element={<EditContact />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
