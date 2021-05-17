import axios from "axios";
import useMock from "./data/mock"; 
import env from '../env.json'

const mockRequests = true;
const baseURL = env.API_HOST;

const client = axios.create({
  baseURL,
});

if (env.ENVIRONMENT === "STATIC") {
  useMock(client);
}

export const fetchAllUsers = () => {
  return client.get("/all-users");
};

export const fetchSingleUser = (id) => {
  return client.get(`/single-user?id=${id}`);
};