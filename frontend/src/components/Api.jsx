
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const fetchData = async () => {
  try {
    const res = await API.get('/data');
    if (!Array.isArray(res.data)) {
      throw new Error("API response is not an array");
    }
    return res;
  } catch (err) {
    console.error("❌ API fetch failed:", err);
    return { data: [] }; 
  }
};
