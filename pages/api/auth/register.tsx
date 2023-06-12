import { connectMongoDB } from "@/libs/mongodb";
import User from "@/models/Users";
import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405).send({ msg: "Only post allowed" });
    return;
  }
  try {
    await connectMongoDB();
    const { name, password, email } = req.body.user;
    const hashedPassword = await hash(password, 12);
    User.create({ name, password: hashedPassword, email }).then((data) => {
      console.log(data);
      res.status(201).send(data);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error, msg: "something went wrong" });
  }
};

export default handler;
