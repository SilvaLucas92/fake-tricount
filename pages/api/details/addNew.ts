import { connectMongoDB } from "@/libs/mongodb";
import CountsDetails from "@/models/CountsDetails";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Only post allowed" });
    return;
  }
  const { countDetail } = req.body;
  try {
    await connectMongoDB();
    CountsDetails.create(countDetail).then((data) => {
      res.status(201).send(data);
    });
  } catch (error) {
    res.status(400).json({ error, msg: "Something went wrong222" });
  }
};

export default handler;
