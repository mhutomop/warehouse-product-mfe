import axios from "axios";

const getAvailableLocations = async () => {
  let url = 'http://localhost:3000/api/locations';
  let response = await axios.get(url);
  return response;
}

export { getAvailableLocations };