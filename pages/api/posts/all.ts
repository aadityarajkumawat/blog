import fs from "fs";
import matter from "gray-matter";
import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";

interface BlogMetaData {
  title: string;
  slug: string;
  date: string;
}

// get the list of all the blog posts
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const blogsPath = path.join(process.cwd(), "blogs");
  console.log(blogsPath);

  const list = fs.readdirSync(blogsPath, {
    encoding: "utf-8",
    withFileTypes: false,
  });

  const { location } = req.body;

  const blogData: Array<BlogMetaData> = [];

  list.map((id) => {
    const file = fs.readFileSync(
      path.join(process.cwd(), `blogs/${id}/index.md`),
      { encoding: "utf-8" }
    );
    const d = matter(file);
    blogData.push(d.data as BlogMetaData);
  });

  const client = new MongoClient(process.env.MONGO_URI as string);
  const blog = client.db("blog").collection("posts");

  await blog.insertOne({ route: `/`, hitAt: new Date(), location });

  res.send(blogData);
}
