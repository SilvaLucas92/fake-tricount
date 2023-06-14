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

export const getAllDetails = async (id: string | undefined | null) => {
  const url = `/api/details/getDetailsCounts?id=${id}`;
  const response = await axios.get(url);
  return response.data;
};

export const addNewDetail = async (payload: postProps) => {
  const url = "/api/details/addNew";
  const response = await axios.post(url, payload);
  return response.data;
};
