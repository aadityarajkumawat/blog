import fs from 'fs'

export function MarkdownParser(id: string) {
  const blog = fs.readFileSync(`blogs/${id}.md`, { encoding: 'utf-8' })
  const [, meta, content] = blog.split('---')

  return {
    getMeta: () => meta,
    getContent: () => content,
  }
}
