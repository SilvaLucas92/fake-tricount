import { connectMongoDB } from "@/libs/mongodb";
import CountsDetails from "@/models/CountsDetails";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "PUT") {
    res.status(405).json({ error: "Only put allowed" });
    return;
  }
  try {
    const { id } = req.query;
    await connectMongoDB();
    const countsDetails = await CountsDetails.findByIdAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json(countsDetails);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err, msg: "Something went wrong" });
  }
};

export default handler;
