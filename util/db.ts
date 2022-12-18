import mongoose from 'mongoose';
import log from './log';

export async function connect(mongoUri: string) {
	mongoose.set('strictQuery', false);
	mongoose
		.connect(mongoUri)
		.then(() => log({ logger: 'db', content: `Connected to the database at ${mongoUri}!`, level: 'info' }))
		.catch(err => log({ logger: 'db', content: `Failed to connect to the database at ${mongoUri}: ${err}`, level: 'fatal' }));
}

export async function disconnect() {
	mongoose.disconnect();
}

