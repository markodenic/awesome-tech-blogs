<template>
  <div class="blog">
    <div class="blog-header">
      <img
        :src="favIcon"
        :alt="blog.name"
        :title="blog.name"
        loading="lazy"
        width="50"
        height="50"
      />

      <a
        :href="blog.url"
        class="ml-3 blog-link text-2xl"
        target="_blank"
        rel="noopener"
      >
        {{ blog.name }}
      </a>
    </div>

    <div class="blog-content">
      <div class="blog-description">
        {{ blog.description }}
      </div>

      <ul class="blog-tags">
        <li
          class="tag tag--small"
          :class="{ 'tag--active': activeTag === slugify(tag) }"
          v-for="(tag, index) in blog.tags"
          :key="index"
        >
          {{ tag }}
        </li>
      </ul>
    </div>

    <div class="blog-footer">
      <a
        class="blog-link"
        :href="blog.url"
        target="_blank"
        rel="noopener"
      >
        {{ path }}
      </a>

      <div v-if="blog.twitter" class="blog-social">
        <a
          :href="`https://x.com/${blog.twitter.replace('@', '')}`"
          target="_blank"
          rel="noopener nofollow"
          :title="blog.twitter"
        >
          <img src="/socials/x-white.png" alt="X" width="20" height="20" />
        </a>
      </div>

      <div v-if="blog.linkedin" class="blog-social">
        <a
          :href="`https://linkedin.com/in/${blog.linkedin}`"
          target="_blank"
          rel="noopener nofollow"
          :title="blog.linkedin"
        >
          <img src="/socials/linkedin-white.png" alt="LinkedIn" width="20" height="20" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
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
  props: {
    blog: {
      type: Object,
      required: true
    },
    activeTag: {
      type: String,
      required: true
    }
  },

  methods: {
    slugify
  },

  computed: {
    domain() {
      try {
        return new URL(this.blog.url).host
      } catch {
        return ''
      }
    },
    path() {
      try {
        const url = new URL(this.blog.url)
        return this.domain + url.pathname.replace(/\/$/, '')
      } catch {
        return this.domain
      }
    },
    favIcon() {
      if (!this.domain) return ''
      const website = `https://unavatar.io/${this.domain}`
      return `https://images.weserv.nl/?url=${website}&w=100&l=9&af&il&n=-1`
    }
  }
}
</script>
