import axios from "axios";

const getMeasurements = async (name) => {
  let url = 'http://localhost:3002/api/measurements';
  if (name) {
    url = `${url}?name=${name}`;
  }
  let response = await axios.get(url);
  return response;
}

const addMeasurement = async (data) => {
  let url = `http://localhost:3002/api/measurements`;
  let response = await axios.post(url, data);
  return response;
}

const updateMeasurement = async (id, data) => {
  let url = `http://localhost:3002/api/measurements/${id}`;
  let response = await axios.put(url, data);
  return response;
}

const deleteMeasurement = async (id) => {
  let url = `http://localhost:3002/api/measurements/${id}`;
  let response = await axios.delete(url);
  return response;
}

export { getMeasurements, addMeasurement, updateMeasurement, deleteMeasurement };