import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import showdown from 'showdown'
import { MarkdownParser } from '../../../utils/parser'
import matter from 'gray-matter'
import path from 'path'

type D = { content: string }

export default function handler(req: NextApiRequest, res: NextApiResponse<D>) {
  const { id } = req.query
  if (!id) throw new Error('id not found')

  const conv = new showdown.Converter()

  const { content } = matter(
    fs.readFileSync(path.join(process.cwd(), `blogs/${id}/index.md`), {
      encoding: 'utf-8',
    }),
  )

  const html = conv.makeHtml(content)

  res.json({ content: html })
}
