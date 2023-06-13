import { connectMongoDB } from "@/libs/mongodb";
import Counts from "@/models/Counts";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Only get allowed" });
    return;
  }
  try {
    const email = req.query.email;
    await connectMongoDB();
    const counts = await Counts.find({ created_by: email });
    res.status(200).send(counts);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err, msg: "Something went wrong" });
  }
};

export default handler;
