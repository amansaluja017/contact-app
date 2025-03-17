import express from 'express';
import { createContact, deleteContact, getAllContacts, getOneContact, updateContact } from '../controllers/contact.controller.js';

const router = express.Router();

router.route('/create-contact').post(createContact);
router.route('/get-contacts').get(getAllContacts);
router.route('/get-current-contact').get(getOneContact);
router.route('/update-contact').patch(updateContact);
router.route('/delete-contact/:contactId').delete(deleteContact);

export default router;