import mongoose from 'mongoose';

export const questionSchema = new mongoose.Schema({
    type: String,
    format: String,
    category: String,
    question: String, // todo: maybe figure out how to do choices separately
    answer: String,
    // @ts-ignore
    tossUp: mongoose.ObjectId, // points to the corresponding toss-up or this
    // @ts-ignore
    bonus: mongoose.ObjectId, // points to the corresponding bonus or this
    submitter: String, // points to user that submitted since ID is string based
    source: String
});

export default mongoose.models.Question || mongoose.model('Question', questionSchema);