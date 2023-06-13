import { connectMongoDB } from "@/libs/mongodb";
import Counts from "@/models/Counts";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Only get allowed" });
    return;
  }
  try {
    const { id } = req.query;
    await connectMongoDB();
    const count = await Counts.findById(id);
    if (!count) {
      res.status(404).json({ error: "Count not found" });
      return;
    }
    res.status(200).json(count);
  } catch (err) {
    res.status(400).json({ err, msg: "Something went wrong" });
  }
};

export default handler;
