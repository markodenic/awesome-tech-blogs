// Writes public/llms.txt and public/sitemap.xml from data.json (runs before build/generate)
import { readFileSync, writeFileSync } from 'node:fs'

const blogs = JSON.parse(readFileSync('data.json', 'utf8'))
const site = 'https://tech-blogs.dev'
const tags = [...new Set(blogs.flatMap(b => b.tags || []))].sort((a, b) => a.localeCompare(b))

const lines = [
  '# Awesome Tech Blogs',
  '',
  `> A community-curated list of ${blogs.length} tech blogs by companies and individual developers, tagged by topic. Anyone can add their blog via a pull request on GitHub.`,
  '',
  `- Full list: ${site}/list`,
  '- Add your blog: https://github.com/markodenic/awesome-tech-blogs',
  `- Sitemap: ${site}/sitemap.xml`,
  '',
  '## Blogs',
  '',
  ...blogs.map(b => `- [${b.name}](${b.url})${b.description ? ': ' + b.description.replace(/\s+/g, ' ').trim() : ''}`),
  '',
  '## Tags',
  '',
  ...tags.map(t => `- ${t}`),
]
writeFileSync('public/llms.txt', lines.join('\n') + '\n')

const urls = [`${site}/`, `${site}/list`]
writeFileSync('public/sitemap.xml',
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  urls.map(u => `  <url><loc>${u}</loc></url>`).join('\n') + '\n</urlset>\n')

console.log(`llms.txt: ${blogs.length} blogs, ${tags.length} tags`)
