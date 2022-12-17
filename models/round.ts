import mongoose from 'mongoose';

import { Question } from '../types/question';
import { userSchema } from './user';

const roundSchema = new mongoose.Schema({
    // no custom ID
    questions: [{}], // should be an array of Question type but idk how to do that
    submitter: userSchema,
    source: String,
});

export default mongoose.models.Round || mongoose.model('Round', roundSchema);