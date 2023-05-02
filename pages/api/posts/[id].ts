import fs from "fs";
import matter from "gray-matter";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import showdown from "showdown";

type D = { content: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<D>
) {
  const { id } = req.query;
  if (!id) throw new Error("id not found");

  const conv = new showdown.Converter();

  const { content } = matter(
    fs.readFileSync(path.join(process.cwd(), `blogs/${id}/index.md`), {
      encoding: "utf-8",
    })
  );
  const html = conv.makeHtml(content);

  res.json({ content: html });
}
