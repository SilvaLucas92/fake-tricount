import axios from "axios";

interface postProps {
  [key: string]: {
    _id: string;
    title: string;
    amount: number;
    created_at: null | string;
    paid_by: string;
    countID: string;
  };
}

export const addNewDetail = async (payload: postProps) => {
  const url = "/api/details/addNew";
  const response = await axios.post(url, payload);
  return response.data;
};

export const deleteDetail = async (id: string | undefined | null) => {
  const url = `/api/details/deleteDetail?id=${id}`;
  const response = await axios.delete(url);
  return response;
};

export const updateDetail = async (id: string | undefined | null, payload: any) => {
  const url = `/api/details/updateDetail?id=${id}`;
  const response = await axios.put(url, payload);
  return response;
};
