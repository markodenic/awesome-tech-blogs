<template>
  <div>
    <GithubCorner />

    <div class="tags mb-6">
      <nuxt-link
        to="/list"
        class="tag"
        :class="{ 'tag--active': activeTag === 'all' }"
      >
        All
        <span class="number">{{ blogsByTag('all') }}</span>
      </nuxt-link>

      <nuxt-link
        v-for="tag in tags"
        :key="tag.name"
        :to="'/' + slugify(tag.name)"
        class="tag"
        :class="{ 'tag--active': activeTag === slugify(tag.name) }"
      >
        {{ tag.name }}
        <span class="number">{{ blogsByTag(tag.name) }}</span>
      </nuxt-link>
    </div>

    <div class="blogs mb-6">
      <Blog
        v-for="(blog, index) in filteredBlogs"
        :key="blog.title + '-' + index"
        :blog="blog"
        :active-tag="activeTag"
      />
    </div>
  </div>
</template>

<script>
import blogs from '~/data.json'
import GithubCorner from '~/components/GithubCorner.vue'
import Blog from '~/components/Blog.vue'

function merge(prop) {
  return function (acc, obj) {
    const values = [...new Set(obj[prop])]
    return [...values, ...acc]
  }
}

function countInstances(acc, tag) {
  acc[tag] = acc[tag] ? acc[tag] + 1 : 1
  return acc
}

function shuffle(array) {
  const length = array == null ? 0 : array.length
  if (!length) return []
  let index = -1
  const lastIndex = length - 1
  const result = array
  while (++index < length) {
    const rand = index + Math.floor(Math.random() * (lastIndex - index + 1))
    const value = result[rand]
    result[rand] = result[index]
    result[index] = value
  }
  return result
}

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/&/g, '-and-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
}

export default {
  components: { GithubCorner, Blog },
  props: {
    activeTag: {
      type: String,
      default: 'all'
    }
  },
  data() {
    return {
      tags: [],
      blogs: []
    }
  },
  created() {
    this.blogs = shuffle(blogs)
    this.getTags()
  },
  methods: {
    getTags() {
      let allTags = blogs.reduce(merge('tags'), [])
      let counts = allTags.reduce(countInstances, {})
      this.tags = Object.entries(counts)
        .sort(([, a], [, b]) => b - a)
        .filter(([, count]) => count >= 10)
        .map(([name, count]) => ({ name, count }))
    },
    slugify,
    blogsByTag(tag) {
      if (tag === 'all') return this.blogs.length
      return this.blogs.filter(blog =>
        blog.tags.some(t => slugify(t) === slugify(tag))
      ).length
    }
  },
  computed: {
    filteredBlogs() {
      if (this.activeTag === 'all') return this.blogs
      return this.blogs.filter(blog =>
        blog.tags.some(t => slugify(t) === this.activeTag)
      )
    }
  }
}
</script>
