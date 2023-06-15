import axios from "axios";

interface postNewCount {
  [key: string]: {
    title: string;
    description: string;
    created_by: string;
    participant: string;
  };
}

export const getAllCounts = async (email: string | null | undefined) => {
  const url = `/api/counts/getCounts?email=${email}`;
  const response = await axios.get(url);
  return response.data;
};

export const addNewCount = async (payload: postNewCount) => {
  const url = "/api/counts/addCounts";
  const response = await axios.post(url, payload);
  return response.data;
};
