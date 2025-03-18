import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const contactSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    phone_number: {
        type: Number,
        required: true,
        unique: true,
        minlength: 10,
        maxlength: 10,
    },
    address: {
        type: String,
    }
},
 {timestamps: true}
);

export const Contact = mongoose.model('Contact', contactSchema);