<template>
  <BlogList :active-tag="category" />
</template>

<script>
import BlogList from '~/components/BlogList.vue'

export default {
  components: { BlogList },
  computed: {
    category() {
      return this.$route.params.category
    }
  }
}
</script>
