import axios from "axios";

const getAvailableCategories = async () => {
  let url = 'http://localhost:3000/api/categories';
  let response = await axios.get(url);
  return response;
}

export { getAvailableCategories };