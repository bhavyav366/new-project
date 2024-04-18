// models/Signup.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const signupSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contact: { type: String, required: true },
    address: { type: String, required: true },
    pincode: { type: String, required: true },
    password: { type: String, required: true }
}, { collection: 'signups' });

// Hash password before saving
signupSchema.pre('save', async function (next) {
    const signup = this;
    if (signup.isModified('password') || signup.isNew) {
        try {
            const hashedPassword = await bcrypt.hash(signup.password, 10);
            signup.password = hashedPassword;
            next();
        } catch (error) {
            next(error);
        }
    } else {
        return next();
    }
});

module.exports = mongoose.model('Signup', signupSchema);
