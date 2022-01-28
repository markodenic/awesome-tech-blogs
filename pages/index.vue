<template>
  <div>
    <div class="tags mb-6">
      <button
        class="tag"
        :class="{ 'tag--active': activeTag === 'all' }"
        @click="activeTag = 'all'"
      >
        All
        <span class="number">{{ '' | blogsByTag }}</span>
      </button>

      <button
        class="tag"
        :class="{ 'tag--active': activeTag === tag.name }"
        v-for="(tag, index) in tags"
        :key="index"
        @click="activeTag = tag.name"
      >
        {{ tag.name }}
        <span class="number">{{ tag.name | blogsByTag }}</span>
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

function countInstances(acc, tag) {
  acc[tag] = acc[tag] ? acc[tag] + 1 : 1;
  return acc;
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
  filters: {
    blogsByTag: (tag) => {
      if (!tag) return blogs.length
      return blogs.filter(blog => blog.tags.includes(tag)).length
    }
  },
  created () {
    this.getTags();
    this.blogs = shuffle(blogs);
  },
  methods: {
    getTags () {
      // Get all tags
      let allTags = blogs.reduce(merge('tags'), []);

      let counts = allTags.reduce(countInstances, {});
      // sort and filter for any tags that only have 1
      this.tags = Object.entries(counts)
        .sort(([, countA], [, countB]) => countB - countA)
        // Show tags that have more then 2 occurrence to keep only the most relevant tags.
        .filter(([, count]) => count >= 5)
        .map(([name, count]) => ({ name, count }));
    },
  }
}
</script>

