<template>
  <div>
    <div class="tags mb-6">
      <button
        class="tag"
        :class="{ 'tag--active': activeTag === tag.name }"
        v-for="(tag, index) in tags"
        :key="index"
        @click="activeTag = tag.name"
      >
        {{ tag.name }}
        <span class="number">{{ tag.count }}</span>
      </button>
    </div>

    <div class="blogs mb-6">
      <Blog
        v-for="blog in filteredBlogs"
        :key="blog.index"
        :blog="blog"
        :active-tag="activeTag"
      />
    </div>
  </div>
</template>

<script>
import blogs from '../data.js';

export default {
  data() {
    return {
      tags: [],
      activeTag: 'all',
      blogs: [],
      minTagCount: 2,
    };
  },

  computed: {
    filteredBlogs() {
      if (this.activeTag === 'all') {
        return this.blogs;
      }

      // filter by tag name (case insensitive)
      return this.blogs.filter((blog) =>
        blog.tags.some((tag) => tag.name.toLowerCase() === this.activeTag)
      );
    },
  },

  created() {
    this.getBlogs();
    this.getTags();
  },

  methods: {
    getBlogs() {
      this.blogs = blogs;
      this.removeDuplicateTags();
      this.shuffleBlogs();
      this.assignIndexToBlogs();
    },

    removeDuplicateTags() {
      this.blogs = this.blogs.forEach((blog) => {
        blog.tags = blog.tags.filter(
          (tag, index, self) =>
            index ===
            self.findIndex((t) => t.toLowerCase() === tag.toLowerCase())
        );
      });
    },

    shuffleBlogs() {
      this.blogs = blogs.sort(() => 0.5 - Math.random());
    },

    assignIndexToBlogs() {
      this.blogs = this.blogs.map((blog, index) => {
        return { ...blog, index };
      });
    },

    getTags() {
      this.getUniqueTagsWithCount();
      this.sortAndFilterTagsByCount();
    },

    getUniqueTagsWithCount() {
      this.tags = [
        {
          name: 'all',
          count: this.blogs.length,
        },
      ];

      this.blogs.forEach((blog) => {
        blog.tags.forEach((tag) => {
          if (
            !this.tags.find((t) => t.name.toLowerCase() === tag.toLowerCase())
          ) {
            this.tags.push({ name: tag, count: 1 });
          } else {
            this.tags.find((t) => t.name.toLowerCase() === tag.toLowerCase())
              .count++;
          }
        });
      });
    },

    sortAndFilterTagsByCount() {
      // filter out tags with count less than this.minTagCount
      // Sort by name and then count
      this.tags = this.tags
        .filter((tag) => tag.count > this.minTagCount)
        .sort((a, b) => a.name.localeCompare(b.name))
        .sort((a, b) => b.count - a.count);
    },
  },
};
</script>
