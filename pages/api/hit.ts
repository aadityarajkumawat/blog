import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const client = new MongoClient(process.env.MONGO_URI as string);
  const blog = client.db("blog").collection("views");

  const { id, location } = req.body;

  await blog.insertOne({ route: `/${id}`, hitAt: new Date(), location });

  res.json({ status: "ok" });
}
