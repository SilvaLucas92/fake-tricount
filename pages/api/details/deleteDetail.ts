import { connectMongoDB } from "@/libs/mongodb";
import CountsDetails from "@/models/CountsDetails";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "DELETE") {
    res.status(405).json({ error: "Only delete allowed" });
    return;
  }
  try {
    const { id } = req.query;
    await connectMongoDB();
    const countsDetails = await CountsDetails.deleteOne({ _id: id });
    res.status(200).json(countsDetails);
  } catch (err) {
    res.status(400).json({ err, msg: "Something went wrong" });
  }
};

export default handler;
