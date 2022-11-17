import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import { MarkdownParser } from '../../../utils/parser'
import matter from 'gray-matter'

interface BlogMetaData {
  title: string
  slug: string
  date: string
}

// get the list of all the blog posts
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const list = fs.readdirSync('blogs', {
    encoding: 'utf-8',
    withFileTypes: false,
  })

  const blogData: Array<BlogMetaData> = []

  list.map((id) => {
    const file = fs.readFileSync(`blogs/${id}`, { encoding: 'utf-8' })
    const d = matter(file)
    blogData.push(d.data as BlogMetaData)
  })

  res.send(blogData)
}
