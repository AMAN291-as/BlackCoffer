import Data from '../models/Data.js';

export const getAllData = async (req, res) => {
  try {
    const data = await Data.find({});
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
