import { connectMongoDB } from "@/libs/mongodb";
import User from "@/models/Users";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405).send({ msg: "Only post allowed" });
    return;
  }
  try {
    await connectMongoDB();
    User.create(req.body.user).then((data) => {
      console.log(data);
      res.status(201).send(data);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error, msg: "something went wrong" });
  }
};

export default handler;
