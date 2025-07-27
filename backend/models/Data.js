import mongoose from 'mongoose';

const dataSchema = new mongoose.Schema({}, { strict: false });
const Data = mongoose.model('Data', dataSchema);

export default Data;
