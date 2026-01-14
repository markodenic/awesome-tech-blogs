<template>
  <BlogList :active-tag="category" />
</template>

<script>
import BlogList from '~/components/BlogList.vue'

export default {
  components: { BlogList },
  setup() {
    const route = useRoute()
    const category = computed(() => route.params.category)

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
