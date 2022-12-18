import mongoose from 'mongoose';

enum Role {
    ADMIN,
    MODERATOR,
    USER
}

enum Status {
    ACTIVE,
    SUSPENDED,
    BANNED
}

// todo: allow different services for same user
// todo: add profile info, maybe a diff type
export const userSchema = new mongoose.Schema({
    _id: {
        type: String, // email/user from GitHub
        required: true
    },
    role: {
        type: String,
        enum: ['ADMIN', 'MODERATOR', 'USER'],
        required: true
    },
    // status: Status,
    // rounds will have a prop or two that will equal this id
    // e.g. creator/submitter
});

export default mongoose.models.User || mongoose.model('User', userSchema);