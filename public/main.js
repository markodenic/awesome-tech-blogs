document.querySelector('.theme-toggle').addEventListener('click', () => {
  const dark = document.documentElement.classList.toggle('dark')
  try {
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  } catch {}
})

const backToTop = document.querySelector('.back-to-top')

function onScroll () {
  backToTop.classList.toggle('is-visible', window.scrollY > 800)
}

window.addEventListener('scroll', onScroll, { passive: true })
onScroll()

backToTop.addEventListener('click', () => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
})

const entriesList = document.querySelector('.entries')
let entries = []

const escape = text => String(text ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))

const slugify = text => text
  .toString()
  .toLowerCase()
  .trim()
  .replace(/\s+/g, '-')
  .replace(/&/g, '-and-')
  .replace(/[^\w\-]+/g, '')
  .replace(/\-\-+/g, '-')

const pad = number => String(number).padStart(3, '0')

function withRef (link) {
  const url = new URL(link)
  url.searchParams.set('ref', 'tech-blogs.dev')
  return url.href
}

function shuffle (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

function topicsFor (blogs) {
  const counts = {}
  for (const blog of blogs) {
    for (const tag of new Set(blog.tags)) counts[tag] = (counts[tag] || 0) + 1
  }
  return Object.entries(counts)
    .sort(([, a], [, b]) => b - a)
    .filter(([, count]) => count >= 10)
    .map(([name]) => ({
      name,
      slug: slugify(name),
      count: blogs.filter(blog => blog.tags.some(tag => slugify(tag) === slugify(name))).length
    }))
}

function entryHtml (blog, index) {
  const url = new URL(blog.url)
  const href = escape(withRef(blog.url))
  const path = url.host + url.pathname.replace(/\/$/, '')

  return `<li class="entry" data-tags="${[...new Set(blog.tags.map(slugify))].join(' ')}">
    <span class="entry-number">${pad(index + 1)}</span>
    <div class="entry-title">
      <a href="${href}" target="_blank" rel="noopener">${escape(blog.name)}</a>
    </div>
    <div class="entry-body">
      <p>${escape(blog.description)}</p>
      <ul class="entry-tags" role="list">
        ${blog.tags.map(tag => `<li><button type="button" data-tag="${slugify(tag)}">${escape(tag)}</button></li>`).join('')}
      </ul>
    </div>
    <div class="entry-meta">
      <a href="${href}" target="_blank" rel="noopener" tabindex="-1">${escape(path)}</a>
    </div>
  </li>`
}

function render (blogs) {
  document.querySelector('.topics').innerHTML =
    `<button type="button" class="topic topic--active" data-tag="all" aria-pressed="true">All <span class="topic-count">${blogs.length}</span></button>` +
    topicsFor(blogs).map(topic => `<button type="button" class="topic" data-tag="${topic.slug}" aria-pressed="false">${escape(topic.name)} <span class="topic-count">${topic.count}</span></button>`).join('')

  entriesList.innerHTML = blogs.map(entryHtml).join('')
  entries = [...entriesList.querySelectorAll('.entry')]

  document.querySelector('.index-shown').textContent = blogs.length
  document.querySelector('.index-total').textContent = blogs.length
  document.querySelector('.index-count').hidden = false
}

async function loadIndex () {
  const status = document.querySelector('[role="status"]')
  try {
    const response = await fetch('/data.json')
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    render(shuffle(await response.json()))
    status.textContent = ''
  } catch {
    entriesList.innerHTML = '<li class="index-error">Couldn’t load the index. <button type="button">Try again</button></li>'
    entriesList.querySelector('button').addEventListener('click', () => location.reload())
    status.textContent = 'Couldn’t load the index.'
  }
  entriesList.removeAttribute('aria-busy')
}

if (entriesList) loadIndex()


function filter (tag) {
  let shown = 0
  for (const entry of entries) {
    const match = tag === 'all' || entry.dataset.tags.split(' ').includes(tag)
    entry.hidden = !match
    if (match) entry.querySelector('.entry-number').textContent = String(++shown).padStart(3, '0')
  }
  document.querySelector('.index-shown').textContent = shown

  for (const topic of document.querySelectorAll('.topic')) {
    const active = topic.dataset.tag === tag
    topic.classList.toggle('topic--active', active)
    topic.setAttribute('aria-pressed', active)
  }
  for (const button of document.querySelectorAll('.entry-tags button')) {
    button.classList.toggle('is-active', button.dataset.tag === tag)
  }
}

document.addEventListener('click', event => {
  const button = event.target.closest('[data-tag]')
  if (button) filter(button.dataset.tag)
})
