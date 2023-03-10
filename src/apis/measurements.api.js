import axios from "axios";

const getAvailableMeasurements = async () => {
  let url = 'http://localhost:3000/api/measurements';
  let response = await axios.get(url);
  return response;
}

export { getAvailableMeasurements };