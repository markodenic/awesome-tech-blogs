<template>
  <BlogList :active-tag="category" />
</template>

<script>
import BlogList from '~/components/BlogList.vue'
import blogs from '~/data.json'

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
  components: { BlogList },
  setup() {
    const route = useRoute()
    const category = computed(() => route.params.category)

    const allTags = new Set()
    blogs.forEach(blog => {
      blog.tags.forEach(tag => allTags.add(slugify(tag)))
    })

    if (!allTags.has(category.value)) {
      throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
    }

    useHead({
      title: computed(() => {
        if (!category.value) return 'Awesome Tech Blogs'
        const categoryName = category.value
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
        return `${categoryName} - Awesome Tech Blogs`
      }),
      link: [
        {
          rel: 'canonical',
          href: computed(() => `https://tech-blogs.dev/${category.value}`)
        }
      ]
    })

    return {
      category
    }
  }
}
</script>
