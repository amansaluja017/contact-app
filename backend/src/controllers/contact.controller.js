import {asyncHandler} from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import { createNewContact, editContact, getCurrentContact, removeContact } from '../services/contact.service.js';
import { Contact } from '../models/contact.models.js';


export const createContact = asyncHandler(async(req, res) => {
    const {name, email, phone_number, address} = req.body;

    if(!name || !phone_number) {
        throw new ApiError(400, 'Name and phone number are required');
    }

    const existedContact = await Contact.findOne({phone_number});

    if(existedContact) {
        return res.status(200).json(new ApiResponse(402, "Contact already exists"));
    }

    const contact = await createNewContact({name, email, phone_number, address});

    if(!contact) {
        throw new ApiError(500, 'Failed to create contact');
    }

    return res.status(200).json(new ApiResponse(201, contact, "Contact created successfully"));
});

export const getAllContacts = asyncHandler(async(req, res) => {
    const contacts = await Contact.find({}).sort({createdAt: -1})

    if(contacts.length < 0) {
        return res.status(200).json(new ApiResponse(200, "no contacts found"))
    }

    return res.status(200).json(new ApiResponse(200, contacts, "All contacts fetched successfully"));
});

export const getOneContact = asyncHandler(async(req, res) => {
    const {contactId} = req.query;

    if(!contactId) {
        throw new ApiError(400, "contact id is required");
    }

    const contact = await getCurrentContact({contactId});

    if(!contact) {
        throw new ApiError(500, "getting error during fetch contact");
    }

    return res.status(200).json(new ApiResponse(200, contact, "Contact fetched successfully"));
});

export const updateContact = asyncHandler(async(req, res) => {
    const {name, email, phone_number, address, contactId} = req.body;


    const contact = await editContact({name, email, phone_number, address, contactId});

    if(!contact) {
        throw new ApiError(500, "Something wrong during edit contact")
    }

    return res.status(200).json(new ApiResponse(200, contact, "contact edit successfully"));
});

export const deleteContact = asyncHandler(async(req, res) => {
    const {contactId} = req.params;

    const contact = await removeContact({contactId});

    if(!contact) {
        throw new ApiError(500, "Something wrong during deleting contact")
    }

    return res.status(200).json(new ApiResponse(200, contact, "contact delete successfully"));
});