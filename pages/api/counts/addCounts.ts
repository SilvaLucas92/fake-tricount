import { connectMongoDB } from "@/libs/mongodb";
import Counts from "@/models/Counts";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Only post allowed" });
    return;
  }
  const { counts } = req.body;
  try {
    await connectMongoDB();
    Counts.create(counts).then((data) => {
      res.status(201).send(data);
    });
  } catch (error) {
    res.status(400).json({ error, msg: "Something went wrong222" });
  }
};

export default handler;
