<template>
  <header id="top" class="text-center pb-6">
    <h1>{{ title }}</h1>
    <p>Find amazing tech-related articles by the Tech community!</p>
  </header>
</template>

<script>
export default {
  name: 'TheHeader',
  computed: {
    title() {
      const category = this.$route.params.category
      if (category) {
        const formattedCategory = category
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
        return `${formattedCategory} - Tech blogs`
      }
      return 'Tech blogs'
    }
  }
}
</script>
