import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import showdown from 'showdown'
import { MarkdownParser } from '../../../utils/parser'

type D = { content: string }

export default function handler(req: NextApiRequest, res: NextApiResponse<D>) {
  const { id } = req.query
  if (!id) throw new Error('id not found')

  const blog = MarkdownParser(id as string)
  const conv = new showdown.Converter()

  const html = conv.makeHtml(blog.getContent())

  res.json({ content: html })
}
