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
        validate: {
            validator: function(v) {
                return /^(?:(?:\+91|0)?[6-9]\d{9})$/.test(v);
            },
            message: 'Phone number should only contain digits.'
        }
    },
    address: {
        type: String,
    }
},
 {timestamps: true}
);

export const Contact = mongoose.model('Contact', contactSchema);