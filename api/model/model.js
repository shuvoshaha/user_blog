import mongoose from 'mongoose';

const useSchema = mongoose.Schema({
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
    
});

export const userModel = mongoose.model("user", useSchema);