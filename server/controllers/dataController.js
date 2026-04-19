import { DataModel } from '../models/DataModel.js';

export const getData = (req, res) => {
  try {
    const data = DataModel.getAll();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
