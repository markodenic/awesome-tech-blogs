<template>
  <div>
    <div class="search">
      <input
        class="search-input"
        type="search"
        v-model.trim="searchKeywords"
        :placeholder="searchInputPlaceholder"
      />
    </div>

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

    <!-- Show matched result count -->
    <div class="search-result-count" v-if="resultCount && searchKeywords">
      {{ resultString }}
    </div>

    <div class="blogs mb-6">
      <Blog
        v-for="blog in filteredBlogs"
        :key="blog.index"
        :blog="blog"
        :active-tag="activeTag"
        @filter-tags="(tag) => (activeTag = tag)"
      />

      <div class="no-result" v-if="searchKeywords && !filteredBlogs.length">
        No blogs found!
      </div>
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
      searchKeywords: '',
      searchKeys: ['name', 'description', 'url', 'twitter', 'tags'],
    };
  },

  computed: {
    filteredBlogs() {
      let blogs = Object.assign([], this.blogs);

      // filter by tag name (case insensitive)
      if (this.activeTag !== 'all') {
        blogs = blogs.filter((blog) =>
          blog.tags.some(
            (tag) => tag.toLowerCase() === this.activeTag.toLowerCase()
          )
        );
      }

      // filter blogs by search keywords (case insensitive)
      if (this.searchKeywords) {
        blogs = blogs.filter((blog) =>
          this.searchKeys.some((key) => this.searchBy(key, blog))
        );
      }

      return blogs;
    },

    searchInputPlaceholder() {
      // Comma separated list of search keywords
      // and add an 'or' before the last one
      const keywords =
        this.searchKeys.slice(0, -1).join(', ') +
        (this.searchKeys.length > 1 ? ' or ' : '') +
        this.searchKeys[this.searchKeys.length - 1];

      return `Search by ${keywords}`;
    },

    resultCount() {
      return this.filteredBlogs.length;
    },

    resultString() {
      const resultString = this.resultCount === 1 ? 'result' : 'results';

      return `Showing ${this.resultCount} ${resultString} for '${this.searchKeywords}'`;
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

    searchBy(key, blog) {
      const searchKeywords = this.searchKeywords.toLowerCase();

      // Check if key exists
      if (!(key in blog)) {
        return false;
      }

      if (key === 'tags') {
        return blog.tags.some((tag) =>
          tag.toLowerCase().includes(searchKeywords)
        );
      }

      return blog[key].toLowerCase().includes(searchKeywords);
    },
  },
};
</script>
