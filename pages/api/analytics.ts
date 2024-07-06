import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const client = new MongoClient(process.env.MONGO_URI as string, {});
  const views = client.db("blog").collection("views");

  const data = await views
    .aggregate([
      {
        $group: {
          _id: "$route",
          count: { $sum: 1 },
        },
      },
    ])
    .toArray();

  const locations = await views
    .aggregate([
      {
        $group: {
          _id: "$location",
          count: { $sum: 1 },
        },
      },
    ])
    .toArray();

  console.log(data, locations);

  res.json({ pageViews: data, locations });
}
