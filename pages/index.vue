<template>
  <div>
    <div class="tags mb-6">
      <button
        class="tag"
        :class="{ 'tag--active': activeTag === 'all' }"
        @click="activeTag = 'all'"
      >
        All
      </button>

      <button
        class="tag"
        :class="{ 'tag--active': activeTag === tag }"
        v-for="(tag, index) in tags"
        :key="index"
        @click="activeTag = tag"
      >
        {{ tag }}
      </button>
    </div>

    <div class="blogs mb-6">
      <template
        v-for="(blog, index) in blogs"
      >
        <Blog
          v-if="blog.tags.includes(activeTag) || activeTag === 'all'"
          :key="index"
          :blog="blog"
          :active-tag="activeTag"
        />
      </template>
    </div>
  </div>
</template>

<script>
import blogs from '../data.js';

function merge(prop) {
  return function(acc, obj) {
    const values = [...new Set(obj[prop])];
    return [...values, ...acc];
  };
}

function shuffle(array) {
  const length = array == null ? 0 : array.length;
  if (!length) {
    return []
  }
  let index = -1;
  const lastIndex = length - 1;
  const result = array;
  while (++index < length) {
    const rand = index + Math.floor(Math.random() * (lastIndex - index + 1));
    const value = result[rand];
    result[rand] = result[index];
    result[index] = value
  }
  return result
}

export default {
  data () {
    return {
      tags: [],
      activeTag: 'all',
      blogs: [],
    }
  },

  created () {
    this.getTags();
    this.blogs = shuffle(blogs);
  },

  methods: {
    getTags () {
      // Get all tags
      let tags = blogs.reduce(merge('tags'), []);

      // Get unique tags
      this.tags = [... new Set(tags)];
    },
  }
}
</script>

