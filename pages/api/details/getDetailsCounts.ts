import { connectMongoDB } from "@/libs/mongodb";
import CountsDetails from "@/models/CountsDetails";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Only get allowed" });
    return;
  }
  try {
    await connectMongoDB();
    const countsDetails = await CountsDetails.find();
    res.status(200).send(countsDetails);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err, msg: "Something went wrong222" });
  }
};

export default handler;
