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
          :class="{ 'tag--active': activeTag === tag }"
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

      <a
        v-if="blog.twitter"
        :href="`https://twitter.com/${blog.twitter}`"
        target="_blank"
        rel="noopener"
      >
        {{ blog.twitter }}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    blog: {
      type: Object,
      required: true
    },
    activeTag: {
      type: String,
      required: true,
    }
  },

  data () {
    return {
      domain: '',
      favIcon: '',
      path: '',
    }
  },

  mounted () {
    const url = new URL(this.blog.url);
    const domain = url.host;
    this.path = domain + url.pathname.replace(/\/$/, '');
    const website = `https://unavatar.now.sh/${domain}`;
    this.favIcon = `https://images.weserv.nl/?url=${website}&w=100&l=9&af&il&n=-1`;
  }
}
</script>
