import mongoose from 'mongoose';

import { Question } from '../types/question';
import question, { questionSchema } from './question';
import { userSchema } from './user';

const roundSchema = new mongoose.Schema({
    // no custom ID
    questions: [questionSchema], // should be an array of Question type but idk how to do that
    submitter: String, // points to ID of user
    source: String,
});

export default mongoose.models.Round || mongoose.model('Round', roundSchema);