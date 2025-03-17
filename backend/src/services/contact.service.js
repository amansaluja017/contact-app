import { Contact } from "../models/contact.models.js"
import ApiError from '../utils/ApiError.js'


export const createNewContact = async ({name, email, phone_number, address}) => {

    try {
        const contact = await Contact.create({
            name,
            email,
            phone_number,
            address
        });

        if(!contact) {
            throw new ApiError(500, "Couldn't create contact");
        }

        return contact;
    } catch (error) {
        console.log(error);
        throw new ApiError(500, "An unexpected error occurred during creating contact");
    }
}

export const getCurrentContact = async ({contactId}) => {
    try {
        const contact = await Contact.findOne({_id: contactId});

        if(!contact) {
            throw new ApiError(404, "Contact not found");
        }

        return contact;
    } catch (error) {
        console.log(error.message);
        throw new ApiError(500, "An unexpected error occurred during getting contact");
    }
}

export const editContact = async({name, email, phone_number, address, contactId} ) => {
    try {

        const editContact = await Contact.findOneAndUpdate({_id: contactId}, {name, email, phone_number, address});

        if(!editContact) {
            throw new ApiError(500, "Couldn't update contact");
        }

        return editContact;
    } catch (error) {
        console.log(error);
        throw new ApiError(500, "An unexpected error occurred during updating contact")
    }
}

export const removeContact = async({contactId}) => {
    try {
        const contact = await Contact.findOneAndDelete({_id: contactId});

        if(!contact) {
            throw new ApiError(500, "Couldn't delete contact");
        } 

        return contact;
    } catch (error) {
        console.error(error);
        throw new ApiError(500, "An unexpected error occurred during deleting contact")
    }
}