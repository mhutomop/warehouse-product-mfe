import axios from "axios";

const getProducts = async (type) => {
  let url = 'http://localhost:3000/api/products';
  if (type) {
    url = `${url}?type=${type}`;
  }
  let response = await axios.get(url);
  return response;
}

const getProductDetail = async (id) => {
  let url = `http://localhost:3000/api/products/${id}`;
  let response = await axios.get(url);
  return response;
}

const addProduct = async (data) => {
  let url = `http://localhost:3000/api/products`;
  let response = await axios.post(url, data);
  return response;
}

const updateProduct = async (id, data) => {
  let url = `http://localhost:3000/api/products/${id}`;
  let response = await axios.put(url, data);
  return response;
}

const deleteProduct = async (id) => {
  let url = `http://localhost:3000/api/products/${id}`;
  let response = await axios.delete(url);
  return response;
}

export { getProducts, getProductDetail, addProduct, updateProduct, deleteProduct };